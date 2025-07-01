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
    const label = await Label.qm.getOneById(inputs.id);

    if (!label) {
      throw 'pathNotFound';
    }

    const pathToProject = await sails.helpers.boards
      .getPathToProjectById(label.boardId)
      .intercept('pathNotFound', (nodes) => ({
        pathNotFound: {
          label,
          ...nodes,
        },
      }));

    return {
      label,
      ...pathToProject,
    };
  },
};
