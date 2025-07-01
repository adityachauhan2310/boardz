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
    const projectFavorite = await ProjectFavorite.qm.getOneByProjectIdAndUserId(
      inputs.projectId,
      inputs.id,
    );

    return !!projectFavorite;
  },
};
