import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  vehicles: DS.hasMany('vehicle-bought'),
  owner: DS.belongsTo('user')
});
