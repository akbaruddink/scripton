const supertest = require("supertest");
const mongoose = require("mongoose");
const nconf = require('nconf');
const async = require('async');
const auth = require('./auth');
const myMoney = require('./my_money')
const sessions = require('./sessions')
const upload = require('./upload')
const user = require('./user')
const fs = require('fs');
let server
nconf.use('memory');
require('../config/environments/common');
require('../config/environments/testing');

//delete previous log files
if(fs.existsSync(__dirname + "/../"+nconf.get("logFiles:database"))){
  fs.unlinkSync(__dirname + "/../"+nconf.get("logFiles:database"))
  fs.closeSync(fs.openSync(__dirname + "/../"+nconf.get("logFiles:database"), 'w'));
}
if(fs.existsSync(__dirname + "/../"+nconf.get("logFiles:winston"))){
  fs.unlinkSync(__dirname + "/../"+nconf.get("logFiles:winston"))
  fs.closeSync(fs.openSync(__dirname + "/../"+nconf.get("logFiles:winston"), 'w'));
}

//setup winston logger
require('../config/initializers/logger');

describe("Starting Tests", function(){
  before("Initializing the app", function(done){
    this.timeout(20000)
    async.series([
      function initializeDBConnection(callback) {
        require('../config/initializers/database')(callback);
      },
      function startServer(callback) {
        require("../config/initializers/server")(function(error, app){
          if(error){
            callback(error)
          }else{
            server = supertest(app)
            callback()
          }
        })
      },
      function initializeBlocktrail(callback){
        require('../config/initializers/blocktrail')(callback)
      }
    ], done)
  })



  it("Starting Apis", function(){
    auth(server);
    myMoney(server)
    sessions(server)
    upload(server)
    user(server)
  })

})
