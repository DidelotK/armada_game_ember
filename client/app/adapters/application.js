import DS from 'ember-data';
// eslint-disable-next-line import/no-unresolved
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

// eslint-disable-next-line import/no-unresolved
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.APP.API_HOST,
  authorizer: 'authorizer:oauth2'
});
