import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard' , {path: '/'});

  this.route('login');
  this.route('register');

  this.route('profile');

  this.route('users', function() {
    this.route('create');
  });
  this.route('vehicles', function() {
    this.route('store');
    this.route('create');
  });

  this.route('rides');
  this.route('rides.plan', {path: '/rides/plan'});

  this.route('404', {path: '/*path'});
});

export default Router;
