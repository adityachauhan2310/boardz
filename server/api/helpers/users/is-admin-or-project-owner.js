module.exports = {
  sync: true,

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
  },

  fn(inputs) {
    return [User.Roles.ADMIN, User.Roles.PROJECT_OWNER].includes(inputs.record.role);
  },
};
