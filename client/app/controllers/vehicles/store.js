// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Controller.extend({
  toast: service(),
  sessionAccount: service('session-account'),
  error: null,
  actions: {
    buy(vehicle) {
      let user = null;
      let vehicleBought = null;

      this.get('sessionAccount').getUser()
        .then(usr => {
          if (!usr) {
            this.set('error', 'An unexpected error occurred');
            return;
          }
          user = usr;
          if (usr.get('money') < vehicle.get('price')) {
            this.set('error', 'Not enough money');
            return;
          }
          const vBought = this.store.createRecord('vehicle-bought', {
            owner: usr,
            model: vehicle
          });
          return vBought.save();
        })
        .then(vBought => {
          vehicleBought = vBought;
          return this.store.query('fleet',
            {filter: {simple: {owner: user.get('id')}}});
        })
        .then(fleets => {
          const fleet = fleets.get('firstObject');
          const vehicles = fleet.get('vehicles');
          vehicles.pushObject(vehicleBought);
          return fleet.save();
        })
        .then(() => {
          user.set('money', user.get('money') - vehicle.get('price'));
          return user.save();
        })
        .then(() => {
          this.get('toast').success('Your car has been added to your fleet');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
