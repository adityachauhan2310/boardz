module.exports = {
  inputs: {
    roleOrRoles: {
      type: 'json',
    },
  },

  async fn(inputs) {
    const users = await User.qm.getAll({
      roleOrRoles: inputs.roleOrRoles,
    });

    return sails.helpers.utils.mapRecords(users);
  },
};
