module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    exceptUserIdOrIds: {
      type: 'json',
    },
  },

  async fn(inputs) {
    const boardSubscriptions = await BoardSubscription.qm.getByBoardId(inputs.id, {
      exceptUserIdOrIds: inputs.exceptUserIdOrIds,
    });

    return sails.helpers.utils.mapRecords(boardSubscriptions, 'userId');
  },
};
