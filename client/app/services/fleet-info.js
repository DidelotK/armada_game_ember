// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {inject: {service}, isEmpty} = Ember;

const lastRide = (rides, vehicleBought) => {
  const vehiculeRides = rides.filter(ride => {
    return ride.get('vehicleId.id') === vehicleBought;
  });
  if (!isEmpty(vehiculeRides)) {
    return vehiculeRides.sortBy('departureTime')[vehiculeRides.length - 1];
  }
  return null;
};
const isRideDone = ride => {
  if (!ride) {
    return true;
  }
  // Diff in micro sec
  const timeSincedeparture = Date.now() - ride.get('departureTime');
  return ride.get('travelDuration') < (timeSincedeparture / 1000);
};

export default Ember.Service.extend({
  store: service('store'),
  sessionAccount: service('session-account'),
  error: false,
  name: null,
  vehicles: [],
  rides: [],

  // eslint-disable-next-line prefer-arrow-callback
  availableVehicles: Ember.computed('vehicles', 'rides', function () {
    const availableVehicles = [];
    const rides = this.get('rides');
    const vehicles = this.get('vehicles');
    if (!vehicles || isEmpty(vehicles)) {
      return availableVehicles;
    }
    if (!rides || isEmpty(rides)) {
      return vehicles;
    }
    const latestRidesVehicles = vehicles
      .map(vehicle => {
        const lRide = lastRide(rides, vehicle.get('id'));
        if (!lRide) {
          availableVehicles.push(vehicle);
        }
        return lRide;
      })
      .filter(ride => {
        return ride;
      });
    const latestDoneRideVehicles = latestRidesVehicles
      .filter(latestRidesVehicle => {
        return isRideDone(latestRidesVehicle);
      });
    const moreAvailableVehicles = latestDoneRideVehicles.map(ride => {
      return ride.get('vehicleId');
    });

    const availableVehiclesId = availableVehicles
      .concat(moreAvailableVehicles)
      .map(vehicle => {
        return vehicle.get('id');
      });
    return vehicles.filter(vehicle => {
      return availableVehiclesId.indexOf(vehicle.get('id')) !== -1;
    });
  }),
  usedVehicles: Ember.computed('availableVehicles',
    // eslint-disable-next-line bject-shorthand
    function () {
      const vehicles = this.get('vehicles');
      if (!vehicles || isEmpty(vehicles)) {
        return [];
      }
      const availableVehicles = this.get('availableVehicles');
      return vehicles.filter(vehicle => {
        return availableVehicles.indexOf(vehicle) === -1;
      });
    }
  ),
  rideInProgress: Ember.computed('rides',
    // eslint-disable-next-line bject-shorthand
    function () {
      const rides = this.get('rides');
      if (!rides || isEmpty(rides)) {
        return [];
      }
      return rides.filter(ride => {
        return !isRideDone(ride);
      });
    }
  ),
  rideDone: Ember.computed('rides',
    // eslint-disable-next-line bject-shorthand
    function () {
      const rides = this.get('rides');
      if (!rides || isEmpty(rides)) {
        return [];
      }
      return rides.filter(ride => {
        return isRideDone(ride);
      });
    }
  ),
  loadInfo() {
    let vehiclesId = null;
    return this.get('store').query('fleet',
      {filter: {simple: {owner: this.get('sessionAccount').get('userId')}}})
      .then(fleets => {
        const fleet = fleets.get('firstObject');

        if (!fleet) {
          this.set('error', true);
          return;
        }
        this.set('name', fleet.get('name'));
        vehiclesId = fleet.get('vehicles').map(vehicle => {
          return vehicle.get('id');
        });
        return this.get('store').query('ride',
          {filter: {vehicleId: vehiclesId}});
      })
      .then(rides => {
        this.set('rides', rides);

        return this.get('store').query('vehicle-bought', {
          filter: {id: vehiclesId}
        });
      })
      .then(vehiclesBought => {
        console.log('LOADED');
        this.set('vehicles', vehiclesBought);
        this.set('error', false);
      })
      .catch(() => {
        console.log('ERREUR');
        this.set('error', true);
      });
  }
});
