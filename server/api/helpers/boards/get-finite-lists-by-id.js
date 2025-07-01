module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    exceptListIdOrIds: {
      type: 'json',
    },
  },

  async fn(inputs) {
    return List.qm.getByBoardId(inputs.id, {
      exceptIdOrIds: inputs.exceptListIdOrIds,
      typeOrTypes: List.FINITE_TYPES,
    });
  },
};
