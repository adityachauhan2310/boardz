module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const boards = await Board.qm.getByProjectId(inputs.id);

    return sails.helpers.utils.mapRecords(boards);
  },
};
