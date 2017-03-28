// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export default Ember.Component.extend({
  name: null,
  password: null,
  errorMessage: null,
  creds: Ember.computed('name', 'password', function () {
    return {
      name: this.get('name'),
      password: this.get('password')
    };
  }),
  actions: {
    simpleLogin() {
      this.sendAction('simpleLogin', this.get('creds'));
    },
    facebookLogin() {
      this.sendAction('facebookLogin');
    }
  }
});
