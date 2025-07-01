module.exports = {
  sync: true,

  inputs: {
    records: {
      type: 'ref',
      required: true,
    },
    user: {
      type: 'ref',
      require: true,
    },
  },

  fn(inputs) {
    return inputs.records.map((record) => sails.helpers.users.presentOne(record, inputs.user));
  },
};
