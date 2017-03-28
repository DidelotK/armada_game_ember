// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

const {computed, defineProperty} = Ember;

export default Ember.Component.extend({
  label: '',
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidation: false,

  hasContent: computed.notEmpty('value'),
  isInvalid: computed.and('hasContent', 'validation.isInvalid'),

  notValidating: computed.not('validation.isValidating').readOnly(),

  showErrorMessage: computed.and('isInvalid', 'showValidation'),

  init() {
    this._super(...arguments);
    const valuePath = this.get('valuePath');
    defineProperty(this, 'validation',
      computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },
  focusIn() {
    this._super(...arguments);
    this.set('showValidation', false);
  },
  focusOut() {
    this._super(...arguments);
    this.set('showValidation', true);
  }
});
