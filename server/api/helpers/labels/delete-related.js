module.exports = {
  inputs: {
    recordOrRecords: {
      type: 'ref',
      required: true,
    },
  },

  async fn(inputs) {
    let labelIdOrIds;
    if (_.isPlainObject(inputs.recordOrRecords)) {
      ({
        recordOrRecords: { id: labelIdOrIds },
      } = inputs);
    } else if (_.every(inputs.recordOrRecords, _.isPlainObject)) {
      labelIdOrIds = sails.helpers.utils.mapRecords(inputs.recordOrRecords);
    }

    await CardLabel.qm.delete({
      labelId: labelIdOrIds,
    });
  },
};
