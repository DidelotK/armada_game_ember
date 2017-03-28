// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {service} = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Vehicles store',
  model() {
    return Ember.RSVP.hash({
      user: this.get('sessionAccount').getUser(),
      models: this.get('store').findAll('vehicle-model')
    });
  }
});
