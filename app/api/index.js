const changeCase = require('change-case');
const express = require('express');
const routes = require('require-dir')();
const logger = require('winston');
const authHandler = require('../handlers/authHandler');

const api = express()


/**
* @apiDefine authorization
* @apiHeader {String} access_token  access token
*
*
*/
api.use('/',authHandler.authorizeUser)
Object.keys(routes).forEach(function(routeName) {
  console.log(routeName);
    // Initialize the route to add its functionality to router
    let route = require('./' + routeName);

    // Add router to the speficied route name in the app
    api.use('/' + changeCase.paramCase(routeName), route);
});

module.exports = api
