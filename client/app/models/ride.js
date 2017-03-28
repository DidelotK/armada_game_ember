import DS from 'ember-data';

export default DS.Model.extend({
  vehicleId: DS.belongsTo('vehicle-bought'),
  departurePlace: DS.attr('string'),
  departureTime: DS.attr('date'),
  travelDuration: DS.attr('number'),
  arrivalPlace: DS.attr('string'),
  benefice: DS.attr('number')
});
