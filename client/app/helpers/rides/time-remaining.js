// eslint-disable-next-line import/no-extraneous-dependencies
import Ember from 'ember';

export function ridesTimeRemaining(params/* , hash */) {
  const departureTime = params[0];
  const travelDuration = params[1];
  const arrivalTime = (departureTime / 1000) + travelDuration;
  let timeRemainingSec = arrivalTime - (Date.now() / 1000);
  if (timeRemainingSec < 0) {
    return 'FINISH';
  }
  let timeRemaining = '';
  if (Math.floor(timeRemainingSec / 86400)) {
    timeRemaining += `${Math.floor(timeRemainingSec / 86400)} J `;
    timeRemainingSec -= Math.floor(timeRemainingSec / 86400) * 86400;
  }
  if (Math.floor(timeRemainingSec / 3600)) {
    timeRemaining += `${Math.floor(timeRemainingSec / 3600)} H `;
    timeRemainingSec -= Math.floor(timeRemainingSec / 3600) * 3600;
  }
  timeRemaining += `${Math.floor(timeRemainingSec / 60)} M`;
  return timeRemaining;
}

export default Ember.Helper.helper(ridesTimeRemaining);
