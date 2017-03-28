// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import UnauthenticatedRouteMixin from
  'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  title: 'Armada - Register',
  model() {
    return this.store.createRecord('user', {
      role: 'user',
      money: 12000
    });
  }
});
