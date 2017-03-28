// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Component.extend({
  user: null,
  fleetInfo: service('fleet-info'),
  actions: {
    logout() {
      this.sendAction('logout');
    }
  }
});
