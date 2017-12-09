'use strict';
const nconf = require('nconf');
const async = require('async');
const logger = require('winston')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// Load Environment variables from .env file
require('dotenv').load();

// Set up configs
nconf.use('memory');
// Load environment variables
nconf.env();
// Load common environment variables
require('./config/environments/common');
// Load config file for the environment
require('./config/environments/' + nconf.get('NODE_ENV'));

//setup winston logger
require('./config/initializers/logger')

logger.info('[APP] Starting server initialization');

// Initialize Modules
async.series([
  function initializeDBConnection(callback) {
    require('./config/initializers/database')(callback);
  },
  function startServer(callback) {
    require('./config/initializers/server')(callback);
  },
  function initializeCronJobs(callback){
    require('./config/initializers/crons')(callback)
  }], function(err) {
    if (err) {
      logger.error('[APP] initialization failed', err);
    } else {
      logger.info('[APP] initialized SUCCESSFULLY');
    }
  }
);
