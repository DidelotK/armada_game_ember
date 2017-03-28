'use strict';
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unassigned-import
require('mongoose-type-email');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const Email = mongoose.SchemaTypes.Email;
const self = process.env.SERVER_IP;
// const helpers = require('../helpers');
// const winston = require('winston');

// eslint-disable-next-line new-cap
const userSchema = new Schema({
  surname: {type: String, required: true},
  name: {type: String, required: true, unique: true},
  email: {type: Email, required: true, unique: true},
  password: {type: String/* , set: Data.prototype.saltySha1 */},
  role: {type: String, enum: ['admin', 'user'], required: true},
  money: {type: Number},
  token: {type: String}
});

const model = mongoose.model('User', userSchema);

module.exports = {
  schema: userSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/users/{id}`,
      relationship: `${self}/api/users/{ownerId}/relationships/{path}`
    }
    // beforeRender(resource, req) {
    //   const token = req.headers.authorization.replace('Bearer ', '');
    //   if (helpers.isAuthenticated(token)) {
    //     winston.log('trace', 'auth');
    //     if (resource._attrs.token !== token) {
    //       resource.removeAttr('email');
    //     }
    //   }
    //
    //   resource.removeAttr('token');
    //   resource.removeAttr('password');
    //   return resource;
    // }
  },
  actions: {
    login(name, password, token) {
      return model.findOneAndUpdate({name, password},
          {token}).exec();
    },
    getUserByToken(token) {
      return model.findOne({token}).exec();
    }
  }
};
