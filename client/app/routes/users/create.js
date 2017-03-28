// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import AuthenticatedRouteMixin
  from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {RSVP, inject: {service}} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  toast: service(),
  title: 'Create user',
  beforeModel(transition) {
    this._super(transition);
    return this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin') {
          this.transitionTo('dashboard');
        }
      });
  },
  model() {
    return this.store.createRecord('user', {
      role: 'user',
      money: 12000
    });
  },
  actions: {
    createUser(user) {
      user.save()
        .then(usr => {
          return this.send('_createFleet', usr);
        })
        .then(() => {
          this.controllerFor('user.create').set('error', null);
          const toast = this.get('toast');
          toast.success('User created');
        })
        .catch(() => {
          console.log('error');
          user.destroyRecord();
          this.controllerFor('user.create')
            .set('error', 'This email already exist');
        });
    },
    _createFleet(user) {
      return new RSVP.Promise((resolve, reject) => {
        const fleetRecord = this.get('store').createRecord('fleet', {
          name: 'My fleet',
          owner: user
        });
        fleetRecord.save()
          .then(fleet => {
            resolve(fleet);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});
