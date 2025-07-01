module.exports = {
  async fn() {
    const { currentUser } = this.req;

    const notifications = await sails.helpers.notifications.readAllForUser.with({
      user: currentUser,
      request: this.req,
    });

    return {
      items: notifications,
    };
  },
};
