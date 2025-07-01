module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    cardId: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const cardSubscription = await CardSubscription.qm.getOneByCardIdAndUserId(
      inputs.cardId,
      inputs.id,
    );

    return !!cardSubscription;
  },
};
