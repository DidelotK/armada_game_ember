'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const self = process.env.SERVER_IP;

// eslint-disable-next-line new-cap
const fleetSchema = new Schema({
  name: {type: String, required: true},
  vehicles: [{type: ObjectId, ref: 'VehicleBought'}],
  owner: {type: ObjectId, ref: 'User', required: true}
});

const model = mongoose.model('Fleet', fleetSchema);

module.exports = {
  schema: fleetSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/fleets/{id}`,
      relationship: `${self}/api/fleets/{ownerId}/relationships/{path}`
    }
  }
};
