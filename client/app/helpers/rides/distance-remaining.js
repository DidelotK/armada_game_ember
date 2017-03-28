// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export function ridesDistanceRemaining(params/* , hash */) {
  const departureTime = params[0];
  const speed = params[1];
  let duration = params[2];
  duration /= 3600;
  const totalDistance = Math.floor(duration * speed);
  let timeSinceDeparture = (Date.now() - departureTime) / 1000; // sec
  timeSinceDeparture /= 3600; // hour
  const traveledDistance = Math.floor(speed * timeSinceDeparture);
  const distanceRemaining = totalDistance - traveledDistance;
  if (distanceRemaining < 0) {
    return '0 KM';
  }
  return `${distanceRemaining} KM`;
}

export default Ember.Helper.helper(ridesDistanceRemaining);
