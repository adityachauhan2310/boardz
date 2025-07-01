module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    pathNotFound: {},
  },

  async fn(inputs) {
    const boardMembership = await BoardMembership.qm.getOneById(inputs.id);

    if (!boardMembership) {
      throw 'pathNotFound';
    }

    const pathToProject = await sails.helpers.boards
      .getPathToProjectById(boardMembership.boardId)
      .intercept('pathNotFound', (nodes) => ({
        pathNotFound: {
          boardMembership,
          ...nodes,
        },
      }));

    return {
      boardMembership,
      ...pathToProject,
    };
  },
};
