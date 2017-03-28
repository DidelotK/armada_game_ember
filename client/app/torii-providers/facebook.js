// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import {configurable} from 'torii/configuration';
import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';

// eslint-disable-next-line import/no-unresolved
import ENV from '../config/environment';

export default FacebookOauth2Provider.extend({
  scope: configurable('scope', 'email, public_profile'),
  fetch(data) {
    return data;
  },
  open() {
    return this._super().then(authData => {
      if (authData.authorizationCode && authData.authorizationCode === '200') {
        // indication that the user hit 'cancel', not 'ok'
        throw new Error('User canceled authorization');
      }
      return Ember.$.get('https://graph.facebook.com/v2.8/oauth/access_token',
        {
          /* eslint-disable camelcase */
          client_id: ENV.torii.providers['facebook-oauth2'].apiKey,
          redirect_uri: ENV.torii.providers['facebook-oauth2'].redirectUri,
          client_secret: ENV.torii.providers['facebook-oauth2'].clientSecret,
          /* eslint-enable camelcase */
          code: authData.authorizationCode
        })
        .then(res => {
          return Ember.$.get('https://graph.facebook.com/me?',
            {
              // eslint-disable-next-line camelcase
              access_token: res.access_token,
              fields: 'email, name'
            });
        })
        .then(res => {
          authData.user = res;
          return authData;
        });
    });
  }
});
