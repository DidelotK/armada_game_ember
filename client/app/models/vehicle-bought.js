import DS from 'ember-data';

export default DS.Model.extend({
  model: DS.belongsTo('vehicle-model'),
  owner: DS.belongsTo('user'),
  boughtOn: DS.attr('date')
});
