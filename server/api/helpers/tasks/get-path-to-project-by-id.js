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
    const task = await Task.qm.getOneById(inputs.id);

    if (!task) {
      throw 'pathNotFound';
    }

    const pathToProject = await sails.helpers.taskLists
      .getPathToProjectById(task.taskListId)
      .intercept('pathNotFound', (nodes) => ({
        pathNotFound: {
          task,
          ...nodes,
        },
      }));

    return {
      task,
      ...pathToProject,
    };
  },
};
