// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  title: 'View rides',
  beforeModel() {
    const fleetInfo = this.controllerFor('rides').get('fleetInfo');
    return fleetInfo.loadInfo();
  }
});
