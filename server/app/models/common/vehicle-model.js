'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const self = process.env.SERVER_IP;

// eslint-disable-next-line new-cap
const vehicleSchema = new Schema({
  brand: {type: String, required: true},
  make: {type: String, required: true},
  price: {type: Number, required: true},
  speed: {type: Number, required: true},
  pictureUrl: {type: String, required: true}
});

const model = mongoose.model('VehicleModel', vehicleSchema);

module.exports = {
  schema: vehicleSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/vehicle-models/{id}`,
      relationship: `${self}/api/vehicle-models/{ownerId}/relationships/{path}`
    }
  }
};
