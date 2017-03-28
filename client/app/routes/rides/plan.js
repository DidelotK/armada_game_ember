// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {service} = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  toast: service(),
  title: 'Plan a ride',
  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionAccount').getUser()
      .then(user => {
        this.set('user', user);
        if (user.get('role') === 'admin') {
          this.transitionTo('dashboard');
        }
        return this.controllerFor('rides.plan').get('fleetInfo').loadInfo();
      });
  },
  model() {
    return this.store.createRecord('ride');
  },
  actions: {
    start(ride) {
      const toast = this.get('toast');
      ride.set('departurePlace',
        ride.get('departurePlace').place.formatted_address);
      ride.set('arrivalPlace',
        ride.get('arrivalPlace').place.formatted_address);
      ride.save()
        .then(() => {
          return this.get('sessionAccount').getUser();
        })
        .then(user => {
          user.set('money', user.get('money') + ride.get('benefice'));
          return user.save();
        })
        .then(() => {
          toast.success('Trip created');
          this.refresh();
        })
        .catch(() => {
          toast.error('Error');
        });
    }
  }
});
