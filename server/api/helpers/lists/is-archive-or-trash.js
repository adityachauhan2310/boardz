module.exports = {
  sync: true,

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
  },

  fn(inputs) {
    return [List.Types.ARCHIVE, List.Types.TRASH].includes(inputs.record.type);
  },
};
