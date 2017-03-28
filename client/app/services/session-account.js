// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {inject: {service}, RSVP, isEmpty} = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  user: null,
  userId: Ember.computed('session.data.user_id',
    'session.data.authenticated.account_id', function () {
      if (this.get('session.data.authenticated.account_id')) {
        return this.get('session.data.authenticated.account_id');
      }
      return this.get('session.data.user_id');
    }),
  loadCurrentUser() {
    const userId = this.get('userId');
    const session = this.get('session');
    if (!isEmpty(userId)) {
      return this.get('store').find('user', userId)
        .then(user => {
          if (!user && session.get('isAuthenticated')) {
            session.invalidate();
            return null;
          }
          this.set('user', user);
          return user;
        })
        .catch(() => {
          if (session.get('isAuthenticated')) {
            session.invalidate();
          } else {
            session.set('data.user_id', null);
          }
          return null;
        });
    }
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return RSVP.Promise.resolve(null);
  },
  getUser() {
    return this.loadCurrentUser();
  },
  getRole() {
    return this.loadCurrentUser().then(user => {
      if (user) {
        return user.get('role');
      }
      return null;
    });
  },
  getName() {
    return this.loadCurrentUser().then(user => {
      if (user) {
        return user.get('name');
      }
      return null;
    });
  }
});
