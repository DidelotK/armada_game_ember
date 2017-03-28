// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

const {RSVP, inject: {service}} = Ember;

export default ToriiAuthenticator.extend({
  store: service('store'),
  session: service('session'),
  torii: service(),
  authenticate(provider, options) {
    let data;
    this._assertToriiIsPresent();

    return this.get('torii').open(provider, options || {})
      .then(d => {
        data = d;
        return this._createUserIfNotExist(data.user);
      })
      .then(() => {
        this._authenticateWithProvider(provider, data);
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  _createUserIfNotExist(user) {
    if (!this._hasAllInformation(user)) {
      return RSVP.Promise.reject('User need more information');
    }
    const session = this.get('session');
    let userRecord = null;

    return new RSVP.Promise((resolve, reject) => {
      this._checkIfUserExist(user.email)
        .then(id => {
          if (id) {
            session.set('data.user_id', id);
            return resolve(id);
          }
          this._createUser(user)
            .then(usr => {
              userRecord = usr;
              session.set('data.user_id', usr.get('id'));
              return this._createFleet(usr);
            })
            .then(() => {
              resolve(session.get('data.user_id'));
            })
            .catch(err => {
              if (userRecord) {
                userRecord.destroy();
              }
              session.set('data.user_id', null);
              reject(err);
            });
        });
    });
  },
  _hasAllInformation(user) {
    if (!user || !user.email || user.email === '' || !user.name) {
      return false;
    }
    return true;
  },
  _checkIfUserExist(email) {
    if (!email) {
      return RSVP.Promise.resolve(null);
    }
    return new RSVP.Promise(resolve => {
      this.get('store').query('user', {
        filter: {
          simple: {
            email
          }
        }
      })
        .then(users => {
          if (users.get('length')) {
            resolve(users.get('firstObject').get('id'));
          } else {
            resolve(null);
          }
        });
    });
  },
  _createFleet(user) {
    const fleetRecord = this.get('store').createRecord('fleet', {
      name: 'My fleet',
      owner: user
    });
    return fleetRecord.save();
  },
  _createUser(user) {
    const userRecord = this.get('store').createRecord('user', {
      role: 'user',
      name: user.name,
      surname: user.name,
      email: user.email,
      money: 12000
    });
    return userRecord.save();
  },
  invalidate(data) {
    const session = this.get('session');
    session.set('data.user_id', null);
    return this.get('torii').close(this._provider, data).then(() => {
      delete this._provider;
    });
  }
});
