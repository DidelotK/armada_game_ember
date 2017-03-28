// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  errorMessage: null,
  actions: {
    register() {
      this.sendAction('register', this.get('user'));
    }
  }
});
