// TODO: rename?
module.exports = {
  sync: true,

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
  },

  fn(inputs) {
    return inputs.record.name || _.upperFirst(inputs.record.type);
  },
};
