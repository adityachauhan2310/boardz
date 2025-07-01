module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const cards = await Card.qm.getByBoardId(inputs.id);

    return sails.helpers.utils.mapRecords(cards);
  },
};
