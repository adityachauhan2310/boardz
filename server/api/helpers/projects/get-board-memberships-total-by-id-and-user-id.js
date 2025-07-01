module.exports = {
  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const boardMemberships = await BoardMembership.qm.getByProjectIdAndUserId(
      inputs.id,
      inputs.userId,
    );

    return boardMemberships.length;
  },
};
