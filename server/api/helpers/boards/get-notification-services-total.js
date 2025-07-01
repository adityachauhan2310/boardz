module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const notificationServices = await NotificationService.qm.getByBoardId(inputs.id);

    return notificationServices.length;
  },
};
