module.exports = {
  async fn() {
    const { currentUser } = this.req;

    const oidcClient = await sails.hooks.oidc.getClient();

    let oidc = null;
    if (oidcClient) {
      const authorizationUrlParams = {
        scope: sails.config.custom.oidcScopes,
      };

      if (!sails.config.custom.oidcUseDefaultResponseMode) {
        authorizationUrlParams.response_mode = sails.config.custom.oidcResponseMode;
      }

      oidc = {
        authorizationUrl: oidcClient.authorizationUrl(authorizationUrlParams),
        endSessionUrl: oidcClient.issuer.end_session_endpoint ? oidcClient.endSessionUrl({}) : null,
        isEnforced: sails.config.custom.oidcEnforced,
      };
    }

    return {
      item: sails.helpers.config.presentOne(
        {
          oidc,
        },
        currentUser,
      ),
    };
  },
};
