module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    projectId: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const projectManager = await ProjectManager.qm.getOneByProjectIdAndUserId(
      inputs.projectId,
      inputs.id,
    );

    return !!projectManager;
  },
};
