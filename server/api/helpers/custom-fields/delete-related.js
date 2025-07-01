module.exports = {
  inputs: {
    recordOrRecords: {
      type: 'ref',
      required: true,
    },
  },

  async fn(inputs) {
    let customFieldIdOrIds;
    if (_.isPlainObject(inputs.recordOrRecords)) {
      ({
        recordOrRecords: { id: customFieldIdOrIds },
      } = inputs);
    } else if (_.every(inputs.recordOrRecords, _.isPlainObject)) {
      customFieldIdOrIds = sails.helpers.utils.mapRecords(inputs.recordOrRecords);
    }

    await CustomFieldValue.qm.delete({
      customFieldId: customFieldIdOrIds,
    });
  },
};
