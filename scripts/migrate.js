const MongoClient = require('mongodb').MongoClient;
const nconf = require('nconf');
const backup = require('mongodb-backup');
const restore = require('mongodb-restore');
const logger = require('winston');
const rimraf = require('rimraf');
const migrationDirectory = require('require-dir')('./migrations');
// Set up configs
nconf.use('memory');

nconf.set("NODE_ENV", process.env.NODE_ENV || development)


// Load common environment variables
require('../config/environments/common');
// Load config file for the environment
require('../config/environments/' + nconf.get('NODE_ENV'));

function connectDatabase(databaseUrl){
    return new Promise(function(resolve, reject) {
      MongoClient.connect(databaseUrl, function(err, db) {
        if(err){
          reject(err)
          return
        }
        resolve(db)
      });
    });
}

function createBackup(databaseUrl, filename, databaseName){
  return new Promise(function(resolve, reject) {
    rimraf(filename+'/'+databaseName, function () {
      backup({
        uri: databaseUrl, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: filename,
        callback: function(err, data){
          if(err){
            reject(err)
            return
          }
          resolve(data)
        }
      });
    });
  });
}


function restoreBackup(databaseUrl, filename){
  return new Promise(function(resolve, reject) {
    MongoClient.connect(databaseUrl, function(err, db) {
      if(err){
        reject(err)
        return
      }
      logger.info("deleting old migration database")
      db.dropDatabase(function(err, res){
        if(err){
          reject(err)
          return
        }
        restore({
          uri: databaseUrl, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
          root: filename,
          callback: function(err, data){
            if(err){
              reject(err)
              return
            }
            resolve(db)
          }
        });
      })
    });
  });
}

function getDbMigrationVersion(db){
  return new Promise(function(resolve, reject) {
    db.collection("counters").findOne({name: "migration"}, function(err, doc) {
      if(err){
        reject(err)
      }
      resolve(doc.migrationVersion || 0)
    })
  });
}

function dropDatabase(db){
  return new Promise(function(resolve, reject) {
    db.dropDatabase(function(err){
      if(err){
        reject(err)
        return
      }
      resolve()
    })
  });
}

let migrationDb, isDatabaseUpgraded = false
createBackup(nconf.get("database:url"), __dirname+'/../backups', "exbot")
.then((res) => {
  logger.info("database backup created successfully")
  return restoreBackup(nconf.get('database:migrationUrl'), __dirname+'/../backups/exbot')
})
.then((db) => {
  migrationDb = db
  logger.info("new migration database created successfully");
  return getDbMigrationVersion(migrationDb)
})
.then((migrationVersion) => {
  let migrationFiles = Object.keys(migrationDirectory).sort()
  let initialPromise = new Promise(function(resolve, reject) {
    resolve()
  });
  for(let i=0,length=migrationFiles.length; i<length; i++){
    if(migrationVersion >= migrationFiles[i]){
      continue;
    }
    initialPromise = initialPromise
    .then(() => {
      let migration = require('./migrations/'+migrationFiles[i])
      return migration(migrationDb)
    })
    .then(() => {
      isDatabaseUpgraded = true
      return createBackup(nconf.get('database:migrationUrl'), __dirname+'/../backups', "exbot_migration")
    })
  }
  return initialPromise
})
.then(() => {
  if(isDatabaseUpgraded){
    return restoreBackup(nconf.get('database:url'), __dirname+'/../backups/exbot_migration')
  }
  console.log("no upgrades found");
})
.then(() => {
  logger.info("migrations completed succesfully");
  return dropDatabase(migrationDb)
})
.then(() => {
  migrationDb.close()
  process.exit()
})
.catch((error) => {
    logger.error(error)
})
