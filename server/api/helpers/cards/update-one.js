const { POSITION_GAP } = require('../../../constants');

module.exports = {
  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
    values: {
      type: 'json',
      required: true,
    },
    project: {
      type: 'ref',
      required: true,
    },
    board: {
      type: 'ref',
      required: true,
    },
    list: {
      type: 'ref',
      required: true,
    },
    actorUser: {
      type: 'ref',
      required: true,
    },
    request: {
      type: 'ref',
    },
  },

  exits: {
    positionMustBeInValues: {},
    boardInValuesMustBelongToProject: {},
    listMustBeInValues: {},
    listInValuesMustBelongToBoard: {},
    coverAttachmentInValuesMustContainImage: {},
  },

  // TODO: use normalizeValues and refactor
  async fn(inputs) {
    const { isSubscribed, ...values } = inputs.values;

    if (values.project && values.project.id === inputs.project.id) {
      delete values.project;
    }

    const project = values.project || inputs.project;

    if (values.board) {
      if (values.board.projectId !== project.id) {
        throw 'boardInValuesMustBelongToProject';
      }

      if (values.board.id === inputs.board.id) {
        delete values.board;
      } else {
        values.boardId = values.board.id;
      }
    }

    const board = values.board || inputs.board;

    if (values.list) {
      if (values.list.boardId !== board.id) {
        throw 'listInValuesMustBelongToBoard';
      }

      if (values.list.id === inputs.list.id) {
        delete values.list;
      } else {
        values.listId = values.list.id;
      }
    } else if (values.board) {
      throw 'listMustBeInValues';
    }

    const list = values.list || inputs.list;

    if (sails.helpers.lists.isFinite(list)) {
      if (values.list && _.isUndefined(values.position)) {
        throw 'positionMustBeInValues';
      }
    } else {
      values.position = null;
    }

    if (values.coverAttachment) {
      if (!values.coverAttachment.data.image) {
        throw 'coverAttachmentInValuesMustContainImage';
      }

      values.coverAttachmentId = values.coverAttachment.id;
    }

    let card;
    if (_.isEmpty(values)) {
      card = inputs.record;
    } else {
      if (!_.isNil(values.position)) {
        const cards = await Card.qm.getByListId(list.id, {
          exceptIdOrIds: inputs.record.id,
        });

        const { position, repositions } = sails.helpers.utils.insertToPositionables(
          values.position,
          cards,
        );

        values.position = position;

        if (repositions.length > 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const reposition of repositions) {
            // eslint-disable-next-line no-await-in-loop
            await Card.qm.updateOne(
              {
                id: reposition.record.id,
                listId: reposition.record.listId,
              },
              {
                position: reposition.position,
              },
            );

            sails.sockets.broadcast(`board:${board.id}`, 'cardUpdate', {
              item: {
                id: reposition.record.id,
                position: reposition.position,
              },
            });

            // TODO: send webhooks
          }
        }
      }

      let prevLabels;
      if (values.board) {
        prevLabels = await sails.helpers.cards.getLabels(inputs.record.id);

        const boardMemberUserIds = await sails.helpers.boards.getMemberUserIds(values.board.id);

        await CardSubscription.qm.delete({
          cardId: inputs.record.id,
          userId: {
            '!=': boardMemberUserIds,
          },
        });

        await CardMembership.qm.delete({
          cardId: inputs.record.id,
          userId: {
            '!=': boardMemberUserIds,
          },
        });

        await CardLabel.qm.delete({
          cardId: inputs.record.id,
        });

        const taskLists = await TaskList.qm.getByCardId(inputs.record.id);
        const taskListIds = sails.helpers.utils.mapRecords(taskLists);

        await Task.qm.update(
          {
            taskListId: taskListIds,
            assigneeUserId: {
              '!=': boardMemberUserIds,
            },
          },
          {
            assigneeUserId: null,
          },
        );

        const boardCustomFieldGroups = await CustomFieldGroup.qm.getByBoardId(inputs.board.id);
        const boardCustomFieldGroupIds = sails.helpers.utils.mapRecords(boardCustomFieldGroups);

        const boardCustomFields =
          await CustomField.qm.getByCustomFieldGroupIds(boardCustomFieldGroupIds);

        const cardCustomFieldGroups = await CustomFieldGroup.qm.getByCardId(inputs.record.id);

        let basedCardCustomFieldGroups;
        let basedCustomFieldGroups;
        let baseCustomFieldGroupById;
        let customFieldsByBaseCustomFieldGroupId;

        if (values.project) {
          const basedBoardCustomFieldGroups = boardCustomFieldGroups.filter(
            ({ baseCustomFieldGroupId }) => baseCustomFieldGroupId,
          );

          basedCardCustomFieldGroups = cardCustomFieldGroups.filter(
            ({ baseCustomFieldGroupId }) => baseCustomFieldGroupId,
          );

          basedCustomFieldGroups = [...basedBoardCustomFieldGroups, ...basedCardCustomFieldGroups];

          const baseCustomFieldGroupIds = sails.helpers.utils.mapRecords(
            basedCustomFieldGroups,
            'baseCustomFieldGroupId',
            true,
          );

          const baseCustomFieldGroups =
            await BaseCustomFieldGroup.qm.getByIds(baseCustomFieldGroupIds);

          baseCustomFieldGroupById = _.keyBy(baseCustomFieldGroups, 'id');

          const baseCustomFields = await CustomField.qm.getByBaseCustomFieldGroupIds(
            Object.keys(baseCustomFieldGroupById),
          );

          customFieldsByBaseCustomFieldGroupId = _.groupBy(
            baseCustomFields,
            'baseCustomFieldGroupId',
          );
        }

        let idsTotal = boardCustomFieldGroups.length + boardCustomFields.length;

        if (values.project) {
          idsTotal += basedCustomFieldGroups.reduce((result, customFieldGroup) => {
            const customFieldsItem =
              customFieldsByBaseCustomFieldGroupId[customFieldGroup.baseCustomFieldGroupId];

            return result + (customFieldsItem ? customFieldsItem.length : 0);
          }, 0);
        }

        const ids = await sails.helpers.utils.generateIds(idsTotal);

        const nextCustomFieldGroupIdByCustomFieldGroupId = {};
        const nextCustomFieldGroupsValues = boardCustomFieldGroups.map(
          (customFieldGroup, index) => {
            const id = ids.shift();
            nextCustomFieldGroupIdByCustomFieldGroupId[customFieldGroup.id] = id;

            const nextValues = {
              ..._.pick(customFieldGroup, ['baseCustomFieldGroupId', 'name']),
              id,
              cardId: inputs.record.id,
              position: POSITION_GAP * (index + 1),
            };

            if (values.project && customFieldGroup.baseCustomFieldGroupId) {
              nextValues.baseCustomFieldGroupId = null;

              if (!customFieldGroup.name) {
                nextValues.name =
                  baseCustomFieldGroupById[customFieldGroup.baseCustomFieldGroupId].name;
              }
            }

            return nextValues;
          },
        );

        if (nextCustomFieldGroupsValues.length > 0) {
          const { position } = nextCustomFieldGroupsValues[nextCustomFieldGroupsValues.length - 1];

          await Promise.all(
            cardCustomFieldGroups.map((customFieldGroup) =>
              CustomFieldGroup.qm.updateOne(customFieldGroup.id, {
                position: customFieldGroup.position + position,
              }),
            ),
          );
        }

        await CustomFieldGroup.qm.create(nextCustomFieldGroupsValues);

        if (values.project) {
          await CustomFieldGroup.qm.update(
            {
              cardId: inputs.record.id,
              baseCustomFieldGroupId: {
                '!=': null,
              },
            },
            {
              baseCustomFieldGroupId: null,
            },
          );

          const unnamedCustomFieldGroups = basedCardCustomFieldGroups.filter(({ name }) => !name);

          await Promise.all(
            unnamedCustomFieldGroups.map((customFieldGroup) =>
              CustomFieldGroup.qm.updateOne(customFieldGroup.id, {
                name: baseCustomFieldGroupById[customFieldGroup.baseCustomFieldGroupId].name,
              }),
            ),
          );
        }

        const nextCustomFieldIdByCustomFieldId = {};
        const nextCustomFieldsValues = boardCustomFields.map((customField) => {
          const id = ids.shift();
          nextCustomFieldIdByCustomFieldId[customField.id] = id;

          return {
            ..._.pick(customField, ['name', 'showOnFrontOfCard', 'position']),
            id,
            customFieldGroupId:
              nextCustomFieldGroupIdByCustomFieldGroupId[customField.customFieldGroupId],
          };
        });

        if (values.project) {
          basedCustomFieldGroups.forEach((customFieldGroup) => {
            const customFieldsItem =
              customFieldsByBaseCustomFieldGroupId[customFieldGroup.baseCustomFieldGroupId];

            if (!customFieldsItem) {
              return;
            }

            customFieldsItem.forEach((customField) => {
              const id = ids.shift();
              nextCustomFieldIdByCustomFieldId[`${customFieldGroup.id}:${customField.id}`] = id;

              nextCustomFieldsValues.push({
                ..._.pick(customField, ['name', 'showOnFrontOfCard', 'position']),
                id,
                customFieldGroupId:
                  nextCustomFieldGroupIdByCustomFieldGroupId[customFieldGroup.id] ||
                  customFieldGroup.id,
              });
            });
          });
        }

        await CustomField.qm.create(nextCustomFieldsValues);

        const customFieldGroupIds = boardCustomFieldGroupIds;
        if (values.project) {
          customFieldGroupIds.push(...sails.helpers.utils.mapRecords(basedCardCustomFieldGroups));
        }

        const customFieldValues = await CustomFieldValue.qm.getByCardId(inputs.record.id, {
          customFieldGroupIdOrIds: customFieldGroupIds,
        });

        await Promise.all(
          customFieldValues.map((customFieldValue) => {
            const updateValues = {
              customFieldGroupId:
                nextCustomFieldGroupIdByCustomFieldGroupId[customFieldValue.customFieldGroupId],
            };

            const nextCustomFieldId =
              nextCustomFieldIdByCustomFieldId[
                `${customFieldValue.customFieldGroupId}:${customFieldValue.customFieldId}`
              ] || nextCustomFieldIdByCustomFieldId[customFieldValue.customFieldId];

            if (nextCustomFieldId) {
              updateValues.customFieldId = nextCustomFieldId;
            }

            return CustomFieldValue.qm.updateOne(customFieldValue.id, updateValues);
          }),
        );
      }

      if (values.list) {
        values.listChangedAt = new Date().toISOString();

        if (values.board || inputs.list.type === List.Types.TRASH) {
          values.prevListId = null;
        } else if (sails.helpers.lists.isArchiveOrTrash(values.list)) {
          values.prevListId = inputs.list.id;
        } else if (inputs.list.type === List.Types.ARCHIVE) {
          values.prevListId = null;
        }
      }

      card = await Card.qm.updateOne(inputs.record.id, values);

      if (!card) {
        return card;
      }

      if (values.board) {
        const labels = await Label.qm.getByBoardId(card.boardId);
        const labelByName = _.keyBy(labels, 'name');

        const labelIds = await Promise.all(
          prevLabels.map(async (label) => {
            if (labelByName[label.name]) {
              return labelByName[label.name].id;
            }

            const { id } = await sails.helpers.labels.createOne.with({
              project,
              values: {
                ..._.omit(label, ['id', 'boardId', 'createdAt', 'updatedAt']),
                board,
              },
              actorUser: inputs.actorUser,
            });

            return id;
          }),
        );

        await Promise.all(
          labelIds.map((labelId) => {
            try {
              return CardLabel.qm.createOne({
                labelId,
                cardId: card.id,
              });
            } catch (error) {
              if (error.code !== 'E_UNIQUE') {
                throw error;
              }
            }

            return Promise.resolve();
          }),
        );

        sails.sockets.broadcast(
          `board:${inputs.board.id}`,
          'cardUpdate',
          {
            item: {
              id: card.id,
              boardId: null,
            },
          },
          inputs.request,
        );

        sails.sockets.broadcast(`board:${card.boardId}`, 'cardUpdate', {
          item: card,
        });

        // TODO: add transfer action
      } else {
        sails.sockets.broadcast(
          `board:${card.boardId}`,
          'cardUpdate',
          {
            item: card,
          },
          inputs.request,
        );

        if (values.list) {
          await sails.helpers.actions.createOne.with({
            values: {
              card,
              type: Action.Types.MOVE_CARD,
              data: {
                card: _.pick(card, ['name']),
                fromList: _.pick(inputs.list, ['id', 'type', 'name']),
                toList: _.pick(values.list, ['id', 'type', 'name']),
              },
              user: inputs.actorUser,
            },
            project: inputs.project,
            board: inputs.board,
            list: values.list,
          });
        }
      }

      sails.helpers.utils.sendWebhooks.with({
        event: 'cardUpdate',
        buildData: () => ({
          item: card,
          included: {
            projects: [project],
            boards: [board],
            lists: [list],
          },
        }),
        buildPrevData: () => ({
          item: inputs.record,
          included: {
            projects: [inputs.project],
            boards: [inputs.board],
            lists: [inputs.list],
          },
        }),
        user: inputs.actorUser,
      });
    }

    if (!_.isUndefined(isSubscribed)) {
      const wasSubscribed = await sails.helpers.users.isCardSubscriber(
        inputs.actorUser.id,
        card.id,
      );

      if (isSubscribed !== wasSubscribed) {
        if (isSubscribed) {
          try {
            await CardSubscription.qm.createOne({
              cardId: card.id,
              userId: inputs.actorUser.id,
            });
          } catch (error) {
            if (error.code !== 'E_UNIQUE') {
              throw error;
            }
          }
        } else {
          await CardSubscription.qm.deleteOne({
            cardId: card.id,
            userId: inputs.actorUser.id,
          });
        }

        sails.sockets.broadcast(
          `user:${inputs.actorUser.id}`,
          'cardUpdate',
          {
            item: {
              isSubscribed,
              id: card.id,
            },
          },
          inputs.request,
        );

        // TODO: send webhooks
      }
    }

    return card;
  },
};
