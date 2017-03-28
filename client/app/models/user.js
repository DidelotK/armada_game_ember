import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const Validations = buildValidations({
  surname: {
    description: 'Surname',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 3,
        max: 15
      })
    ]
  },
  name: {
    description: 'Name',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 3,
        max: 15
      })
    ]
  },
  email: {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  password: {
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10
      })/* ,
      validator('format', {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/,
        message: `{description} must include at least
         one upper case letter, one lower case letter, and a number`
      }),
      validator('length', {
        isWarning: true,
        min: 6,
        message: 'What kind of weak password is that?'
      }) */
    ]
  },
  passwordConfirmation: validator('confirmation', {
    on: 'password',
    message: 'Password do not match'
  })
});

export default DS.Model.extend(Validations, {
  surname: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  role: DS.attr('string'),
  money: DS.attr('number')
});
