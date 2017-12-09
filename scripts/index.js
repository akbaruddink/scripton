const mongoose = require('mongoose');
const child_process = require('child_process');
const cleanHoldingTradeTransactions = require('./cleanHoldingTradeTransactions');
const nconf = require('nconf');
const logger = require('winston')
// Set up configs
nconf.use('memory');
nconf.argv()
mongoose.set('debug',true)


if(nconf.get('p')){
  require(__dirname+'/../config/environments/production.js')
}else if(nconf.get('d')){
  require(__dirname+'/../config/environments/development.js')
}else {
  console.log("define production or development environment");
  return
require('../config/environments/common.js')
}
//setup winston logger
require('../config/initializers/logger')

mongoose.connect(nconf.get('database:url'),function(error){
  if(error){
    logger.error(error)
  }else{
    logger.info("Database is succesfully connected to: "+nconf.get('database:url'))
    cleanHoldingTradeTransactions()
  }
})

// mongoose.connect(nconf.get('database:url'), function(error){
//   if(!error){
//     process.exit("unable to connect to mongoose")
//   }
//   console.log("mongoose connected");
//
//   cleanHoldingTradeTransactions()
// })
