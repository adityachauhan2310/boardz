const { URL } = require('url');

module.exports = {
  inputs: {
    url: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    const { hostname } = new URL(inputs.url);

    if (!sails.helpers.utils.isPreloadedFaviconExists(hostname)) {
      await sails.helpers.utils.downloadFavicon(inputs.url);
    }

    return {
      hostname,
      url: inputs.url,
    };
  },
};
