module.exports = {
  sync: true,

  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
  },

  fn(inputs) {
    const fileManager = sails.hooks['file-manager'].getInstance();

    return {
      ..._.omit(inputs.record, ['dirname', 'extension']),
      url: `${fileManager.buildUrl(`${sails.config.custom.backgroundImagesPathSegment}/${inputs.record.dirname}/original.${inputs.record.extension}`)}`,
      thumbnailUrls: {
        outside360: `${fileManager.buildUrl(`${sails.config.custom.backgroundImagesPathSegment}/${inputs.record.dirname}/outside-360.${inputs.record.extension}`)}`,
      },
    };
  },
};
