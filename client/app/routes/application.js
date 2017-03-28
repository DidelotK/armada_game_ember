// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import ApplicationRouteMixin from
  'ember-simple-auth/mixins/application-route-mixin';

const {service} = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),
  fleetInfo: service('fleet-info'),
  beforeModel() {
    return this.get('sessionAccount').loadCurrentUser()
      .then(user => {
        if (user && user.get('role') !== 'admin') {
          return this.get('fleetInfo').loadInfo();
        }
      });
  }
});
