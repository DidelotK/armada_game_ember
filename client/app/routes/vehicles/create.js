// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {service} = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  toast: service(),
  model() {
    return this.store.createRecord('vehicle-model');
  },
  actions: {
    createVehicle(vehicle) {
      vehicle.save()
        .then(() => {
          const toast = this.get('toast');
          toast.success('Vehicle created');
          this.refresh();
        });
    }
  }
});
