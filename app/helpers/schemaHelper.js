const nconf = require('nconf');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
Joi.objectId = require('eko-joi-objectid')(Joi, ObjectId);
Joi.trimString = Joi.string().trim


let schemaHelper = {

}

module.exports = schemaHelper
