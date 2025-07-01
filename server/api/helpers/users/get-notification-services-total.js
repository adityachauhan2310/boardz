module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const notificationServices = await NotificationService.qm.getByUserId(inputs.id);

    return notificationServices.length;
  },
};
