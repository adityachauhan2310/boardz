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
    const projectManager = await ProjectManager.qm.getOneById(inputs.id);

    if (!projectManager) {
      throw 'pathNotFound';
    }

    const project = await Project.qm.getOneById(projectManager.projectId);

    if (!project) {
      throw {
        pathNotFound: {
          projectManager,
        },
      };
    }

    return {
      projectManager,
      project,
    };
  },
};
