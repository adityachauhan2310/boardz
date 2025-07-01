module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    boardId: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const boardMembership = await BoardMembership.qm.getOneByBoardIdAndUserId(
      inputs.boardId,
      inputs.id,
    );

    return !!boardMembership;
  },
};
