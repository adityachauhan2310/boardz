module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const boardMemberships = await BoardMembership.qm.getByBoardId(inputs.id);

    return sails.helpers.utils.mapRecords(boardMemberships, 'userId');
  },
};
