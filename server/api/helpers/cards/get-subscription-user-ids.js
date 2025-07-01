module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    exceptUserIdOrIds: {
      type: 'json',
    },
  },

  async fn(inputs) {
    const cardSubscriptions = await CardSubscription.qm.getByCardId(inputs.id, {
      exceptUserIdOrIds: inputs.exceptUserIdOrIds,
    });

    return sails.helpers.utils.mapRecords(cardSubscriptions, 'userId');
  },
};
