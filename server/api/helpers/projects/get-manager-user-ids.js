module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const projectManagers = await ProjectManager.qm.getByProjectId(inputs.id);

    return sails.helpers.utils.mapRecords(projectManagers, 'userId');
  },
};
