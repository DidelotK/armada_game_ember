// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  sessionAccount: service('session-account'),
  errorMessage: null,
  actions: {
    simpleLogin(creds) {
      this.get('session')
        .authenticate('authenticator:oauth2', creds.name, creds.password)
        .catch(err => {
          this.set('errorMessage', err.error || err);
        });
    },
    facebookLogin() {
      this.get('session')
        .authenticate('authenticator:torii', 'facebook')
        .catch(err => {
          this.set('errorMessage', err.error || err);
        });
    }
  }
});
