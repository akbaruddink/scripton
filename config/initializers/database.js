const mongoose = require('mongoose');
const nconf = require('nconf')
const winston = require('winston');
const MongoClient = require('mongodb').MongoClient;
const logger = winston
const options = {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};

module.exports = function(cb) {
  if(nconf.get("isTesting")){
    createNewDatabase(cb, nconf.get("database:url"))
    return
  }
  connectDatabase(cb, nconf.get('database:url'))
}

function connectDatabase(cb, databaseUrl){
  mongoose.connect(databaseUrl, options, function(error){
		if(error){
			logger.error(error)
      return cb(error)
    }
    //Set mongoose to debug, if app is in development mode
  	mongoose.set('debug',nconf.get('debug'))
    if(nconf.get('isTesting')){
      let testLogger = new (winston.Logger)({
          transports: [
            new (winston.transports.File)({ filename: nconf.get("logFiles:database") })
          ]
      });
      mongoose.set('debug', function(collectionName, method, query, doc) {
        testLogger.info("%s %s %s", collectionName, method, query)
      })
    }
		logger.info("Database is succesfully connected to: "+nconf.get('database:url'))
    initializeDatabase(cb)
    // return  cb(error)
	})
}

function createNewDatabase(cb, databaseUrl){
  try{
    MongoClient.connect(databaseUrl, function(err, db) {
      if(err){
        if(databaseUrl === nconf.get("database:url")){
          createNewDatabase(cb, nconf.get("database:url2"))
          return
        }
        cb(err)
        return
      }
      // Let's drop the database
      db.dropDatabase(function(err, result) {
          logger.info('we dropped the database ');
          db.close(function(error){
             logger.info("connection closed");
             connectDatabase(cb, databaseUrl)
          });
      });
    });
  }catch(err){
    if(databaseUrl === nconf.get("database:url")){
      createNewDatabase(cb, nconf.get("database:url2"))
      return
    }
    cb(err)
  }
}

function initializeDatabase(cb){
  //Any Database initialization stuff
  cb()

}
