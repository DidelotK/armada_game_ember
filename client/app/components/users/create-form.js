// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export default Ember.Component.extend({
  roles: ['admin', 'user'],
  user: null,
  error: null
});
