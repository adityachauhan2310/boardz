module.exports = {
  sync: true,

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
    user: {
      type: 'ref',
    },
  },

  fn(inputs) {
    const data = {
      ...inputs.record,
      version: sails.config.custom.version,
    };
    if (inputs.user && inputs.user.role === User.Roles.ADMIN) {
      data.activeUsersLimit = sails.config.custom.activeUsersLimit;
    }

    return data;
  },
};
