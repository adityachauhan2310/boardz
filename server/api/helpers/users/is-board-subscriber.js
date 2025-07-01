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
    const boardSubscription = await BoardSubscription.qm.getOneByBoardIdAndUserId(
      inputs.boardId,
      inputs.id,
    );

    return !!boardSubscription;
  },
};
