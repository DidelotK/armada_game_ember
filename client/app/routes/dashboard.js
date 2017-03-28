// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {service} = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  // eslint-disable-next-line bject-shorthand
  title: null,
  beforeModel(transition) {
    this._super(transition);
    const fleetInfo = this.controllerFor('dashboard').get('fleetInfo');
    return this.get('sessionAccount').getUser()
      .then(user => {
        if (!user) {
          return;
        }
        this.set('title', `Armada -  ${user.get('name')}`);
        if (user.get('role') !== 'admin') {
          return fleetInfo.loadInfo();
        }
      });
  },
  model() {
    return Ember.RSVP.hash({
      user: this.get('sessionAccount').getUser()
    });
  }
});
