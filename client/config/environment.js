/* jshint node: true */

module.exports = environment => {
  const ENV = {
    modulePrefix: 'client',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:3000  maps.gstatic.com",
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com",
      'frame-src': "'none'"
    },
    googleMap: {
      // your configuration goes in here
      libraries: ['places', 'geometry'], // milage varies based on g-maps supported features
      apiKey: 'AIzaSyC32lAlY-QGz1gF34mLg5-cis022ZBotco',
      lazyLoad: false, // default
      language: 'Js'
    },
    APP: {
      API_HOST: 'http://localhost:3000'
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moment: {
      outputFormat: 'L'
    },
    torii: {
      providers: {
        'facebook-oauth2': {
          apiKey: '600326566837912',
          scope: 'email, public_profile',
          clientSecret: 'c72872bf006069482b9e8e4671563e1d',
          redirectUri: 'http://localhost:4200/'
        }
      }
    },
    'ember-simple-auth': {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard'
    },
    'ember-toastr': {
      injectAs: 'toast',
      toastrOptions: {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '4000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  /*
   if (environment === 'production') {

   }
   */
  return ENV;
};
