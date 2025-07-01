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
    const backgroundImage = await BackgroundImage.qm.getOneById(inputs.id);

    if (!backgroundImage) {
      throw 'pathNotFound';
    }

    const project = await Project.qm.getOneById(backgroundImage.projectId);

    if (!project) {
      throw {
        pathNotFound: {
          backgroundImage,
        },
      };
    }

    return {
      backgroundImage,
      project,
    };
  },
};
