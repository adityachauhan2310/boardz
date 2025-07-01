module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const projectManagers = await ProjectManager.qm.getByUserId(inputs.id);

    return projectManagers.length;
  },
};
