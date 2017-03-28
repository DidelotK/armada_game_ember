// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

// eslint-disable-next-line no-undef
const Google = window.google;

const {inject: {service}, RSVP} = Ember;

export default Ember.Component.extend({
  store: service('store'),
  fleetInfo: null,
  ride: null,
  vehicleSelected: null,
  departureAddress: null,
  arrivalAddress: null,
  estimatedDistance: 'NA',
  estimatedDuration: 'NA',
  estimatedBenefice: 'NA',
  getRideInfo() {
    const ride = this.get('ride');
    if (!ride.get('departurePlace') || !ride.get('arrivalPlace')) {
      return RSVP.Promise.reject('Need more infos');
    }
    const directionsService = new Google.maps.DirectionsService();
    const request = {
      origin: ride.get('departurePlace'),
      destination: ride.get('arrivalPlace'),
      travelMode: Google.maps.TravelMode.DRIVING
    };
    return new RSVP.Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === Google.maps.DirectionsStatus.OK) {
          const leg = result.routes[0].legs[0];
          return resolve(leg);
        }
        reject('Directions status KO');
      });
    });
  },
  setDuration(leg) {
    const ride = this.get('ride');
    if (!ride.get('departurePlace') || !ride.get('arrivalPlace') ||
      !this.get('vehicleSelected')) {
      return;
    }
    const speed = ride.get('vehicleId.model.speed');
    const distance = leg.distance.value;
    let duration = distance / (1000 * speed); // hour
    duration *= 3600;
    this.set('estimatedDuration', duration);
    ride.set('travelDuration', duration);
  },
  setDistanceBenefice(leg) {
    const ride = this.get('ride');
    if (!ride.get('departurePlace') || !ride.get('arrivalPlace')) {
      return;
    }
    const distance = leg.distance; // en metre
    this.set('estimatedDistance', distance.text);

    const benef = Math.trunc(distance.value / 1000 * 0.89);
    this.set('estimatedBenefice', `${benef} €`);
    ride.set('benefice', benef);
  },
  actions: {
    didUpdateDeparture(place) {
      const ride = this.get('ride');
      ride.set('departurePlace', place);
      this.getRideInfo()
        .then(leg => {
          this.setDistanceBenefice(leg);
          this.setDuration(leg);
        })
        .catch(() => {});
    },
    didUpdateArrival(place) {
      const ride = this.get('ride');
      ride.set('arrivalPlace', place);
      this.getRideInfo()
        .then(leg => {
          this.setDistanceBenefice(leg);
          this.setDuration(leg);
        })
        .catch(() => {});
    },
    updateVehicle(component, id) { // jshint ignore:line
      const ride = this.get('ride');
      this.set('vehicleSelected', id);
      ride.set('vehicleId', this.get('store').peekRecord('vehicle-bought', id));
      this.getRideInfo()
        .then(leg => {
          this.setDuration(leg);
        })
        .catch(() => {});
    },
    invalidDepartureSelection() {

    },
    invalidArrivalSelection() {

    },
    start(ride) {
      if (!ride.get('departurePlace') || !ride.get('arrivalPlace') ||
        !ride.get('vehicleId') || !ride.get('travelDuration')) {
        return;
      }
      this.set('vehicleSelected', null);
      this.set('departureAddress', null);
      this.set('arrivalAddress', null);
      this.set('estimatedDistance', 'NA');
      this.set('estimatedDuration', 'NA');
      this.set('estimatedBenefice', 'NA');
      this.sendAction('start', ride);
    }
  }
});
