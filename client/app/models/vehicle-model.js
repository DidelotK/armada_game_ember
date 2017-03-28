import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const Validations = buildValidations({
  brand: {
    description: 'Brand',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 1
      })
    ]
  },
  make: {
    description: 'Make',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 1
      })
    ]
  },
  price: {
    description: 'Price',
    validators: [
      validator('number', {
        allowString: true,
        integer: true,
        gt: 0
      })
    ]
  },
  speed: {
    description: 'Speed',
    validators: [
      validator('number', {
        allowString: true,
        integer: true,
        gt: 0
      })
    ]
  },
  pictureUrl: {
    description: 'Picture Url',
    validators: [
      validator('presence', true)
    ]
  }
});

export default DS.Model.extend(Validations, {
  brand: DS.attr('string'),
  make: DS.attr('string'),
  price: DS.attr('number'),
  speed: DS.attr('number'),
  pictureUrl: DS.attr('string')
});
