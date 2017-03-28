// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export function formatMoney(params/* , hash */) {
  if (params / 1000000 > 1) {
    return Math.floor(params / 1000000) + ' M';
    // params -= Math.floor(params / 1000000) * 1000000;
  }
  if (params / 1000 > 1) {
    return Math.floor(params / 1000) + ' k';
    // params -= Math.floor(params / 1000) * 1000;
  }
  return params;
}

export default Ember.Helper.helper(formatMoney);
