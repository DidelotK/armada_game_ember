import OAuth2PasswordGrant
  from 'ember-simple-auth/authenticators/oauth2-password-grant';

// eslint-disable-next-line import/no-unresolved
import ENV from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.APP.API_HOST}/api/users/login`,
  serverTokenRevocationEndpoint: `${ENV.APP.API_HOST}/api/users/logout`
});
