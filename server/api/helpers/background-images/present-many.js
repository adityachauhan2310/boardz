module.exports = {
  sync: true,

  inputs: {
    records: {
      type: 'ref',
      required: true,
    },
  },

  fn(inputs) {
    return inputs.records.map((record) => sails.helpers.backgroundImages.presentOne(record));
  },
};
