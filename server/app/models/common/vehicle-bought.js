'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const self = process.env.SERVER_IP;

// eslint-disable-next-line new-cap
const vehicleBougthSchema = new Schema({
  model: {type: ObjectId, ref: 'VehicleModel', required: true},
  owner: {type: ObjectId, ref: 'User', required: true},
  boughtOn: {type: Date, default: Date.now, required: true}
});

const model = mongoose.model('VehicleBought', vehicleBougthSchema);

module.exports = {
  schema: vehicleBougthSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/vehicle-boughts/{id}`,
      relationship: `${self}/api/vehicle-boughts/{ownerId}/relationships/{path}`
    },
    beforeSave: resource => { // jshint ignore:line
      resource._attrs.boughtOn = Date.now();
      return resource;
    }
  }
};
