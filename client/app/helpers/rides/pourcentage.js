// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export function ridesPourcentage(params/* , hash */) {
  const departureTime = params[0];
  const travelDuration = params[1];
  const timeSinceDeparture = (Date.now() - departureTime) / 1000;
  const pourcentage = Math.floor(((timeSinceDeparture / travelDuration) * 100));
  if (pourcentage > 100) {
    return '100 %';
  }
  return `${pourcentage} %`;
}

export default Ember.Helper.helper(ridesPourcentage);
