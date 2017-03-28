// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  fleetInfo: service('fleet-info'),
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
