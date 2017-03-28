// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export default Ember.Component.extend({
  fleetInfo: null,
  selectedRide: null,
  typeRide: 'inProgress',
  nextTick: null,
  refreshTick: true,
  tick() {
    const nextTick = Ember.run.later(this, function () {
      this.set('refreshTick', !this.get('refreshTick'));
      this.tick();
    }, 5000);
    this.set('nextTick', nextTick);
  },
  rides: Ember.computed('typeRide', function () {
    const typeRide = this.get('typeRide');
    if (typeRide === 'inProgress') {
      return this.get('fleetInfo.rideInProgress');
    }
    return this.get('fleetInfo.rideDone');
  }),
  didInsertElement() {
    this.tick();
  },
  actions: {
    selectRide(ride) {
      this.set('selectedRide', ride);
    },
    changeTypeRide(type) {
      this.set('typeRide', type);
      this.set('selectedRide', null);
    }
  },
  willDestroyElement() {
    const nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
  }
});
