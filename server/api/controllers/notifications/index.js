module.exports = {
  async fn() {
    const { currentUser } = this.req;

    const notifications = await Notification.qm.getUnreadByUserId(currentUser.id);

    const userIds = sails.helpers.utils.mapRecords(notifications, 'creatorUserId', true, true);
    const users = await User.qm.getByIds(userIds);

    return {
      items: notifications,
      included: {
        users: sails.helpers.users.presentMany(users, currentUser),
      },
    };
  },
};
