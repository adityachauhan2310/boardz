module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    exceptProjectManagerIdOrIds: {
      type: 'json',
    },
  },

  async fn(inputs) {
    const projectManagers = await ProjectManager.qm.getByProjectId(inputs.id, {
      exceptIdOrIds: inputs.exceptProjectManagerIdOrIds,
    });

    return projectManagers.length;
  },
};
