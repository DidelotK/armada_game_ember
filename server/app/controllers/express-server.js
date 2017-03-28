'use strict';

const app = require('express')();
const API = require('json-api');
const mongoose = require('mongoose');
const auth = require('./authentication');

mongoose.connect(process.env.MONGO);

if (process.env.ENV === 'dev') {
  const allowHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept',
    'Cache-Control', 'Authorization'];

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods',
      'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
  app.use(require('morgan')('dev'));
}

const models = {
  User: require('../models/common/user').model,
  Fleet: require('../models/common/fleet').model,
  Ride: require('../models/common/ride').model,
  VehicleModel: require('../models/common/vehicle-model').model,
  VehicleBought: require('../models/common/vehicle-bought').model
};

const registryTemplates = {
  users: require('../models/common/user').registry,
  fleets: require('../models/common/fleet').registry,
  rides: require('../models/common/ride').registry,
  'vehicle-models': require('../models/common/vehicle-model').registry,
  'vehicle-boughts': require('../models/common/vehicle-bought').registry
};

const opts = [
  'users',
  'fleets',
  'rides',
  'vehicle-models',
  'vehicle-boughts'
].join('|');

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registryTemplates,
  {dbAdapter: adapter});

const docs = new API.controllers.Documentation(registry,
  {name: 'Vroum vroum API'});
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.options('/api/*', (req, res) => {
  res.send();
});

app.use('/api/users/', require('./service/user')(auth));

app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${opts})`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);

app.route(`/api/:type(${opts})/:id`)
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.route(`/api/:type(${opts})/:id/relationships/:relationship`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
  .delete(apiReqHandler);

app.use((req, res, next) => {
  front.sendError(new API.types.Error(404, undefined, 'Not Found'), req, res);
  next();
});

module.exports = app;
