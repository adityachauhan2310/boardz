module.exports = {
  inputs: {
    total: {
      type: 'number',
      required: true,
    },
  },

  async fn(inputs) {
    const queryResult = await sails.sendNativeQuery(
      'SELECT next_id() as id from generate_series(1, $1) ORDER BY id',
      [inputs.total],
    );

    return sails.helpers.utils.mapRecords(queryResult.rows);
  },
};
