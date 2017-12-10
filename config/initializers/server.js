// config/initializers/server.js

const express = require('express');
const path = require('path');
// Local dependecies
const nconf = require('nconf');
const https = require('https')
// create the express app
// configure middlewares
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('winston');
const cors = require('cors');
const fs = require('fs');
const morganHandler = require('../../app/handlers/morganHandler')

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
var app;

var start =  function(cb) {
  'use strict';
  // Configure express
  app = express();

  app.use(morganHandler.getMorgan({stream: {write: (message) => logger.info(message)}}));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({ type: 'application/*' }));
  app.use(bodyParserErrorChecker);
  app.use(cors())

  logger.info('[SERVER] Initializing routes');
  app.get('/js/ss/:productId', (req, res)=> {
    let data = fs.readFileSync(path.join(__dirname, '../../public/js/ss.js'), 'utf-8')
    data = data.replace("{{productId}}", req.params.productId)
    res.send(data)
  })
  app.use(express.static(path.join(__dirname, '/../../public')));

  //routes
  app.use('/api/auth', require('../../app/auth/apiAuth'))
app.use('/api', require('../../app/api'))
app.use('/admin-api/auth', require('../../app/auth/adminApiAuth'))
app.use('/admin-api', require('../../app/adminApi'))
app.use('/public-api/auth', require('../../app/auth/publicApiAuth'))
app.use('/public-api', require('../../app/publicApi'))


  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });

  if(nconf.get('isTesting')){
    cb(false, app)
    return
  }

  // FOR HTTPS connection
  // const httpsOptions = {
  //   key: fs.readFileSync(__dirname+'/../../ssl_certs/key.pem'),
  //   cert: fs.readFileSync(__dirname+'/../../ssl_certs/cert.pem')
  // }

  // let server = https.createServer(httpsOptions, app).listen(nconf.get('port'), () => {
  //   console.log('server running at ' + nconf.get('port'))
  // })

  let server = app.listen(nconf.get('port'),() => {
    console.log('server running at ' + nconf.get('port'))
  })

  logger.info('[SERVER] Listening on port ' + nconf.get('port'));

  if(cb){
    return cb();
  }
};

function bodyParserErrorChecker(error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.status(400).json({status: false, error: "SyntaxError"})
  } else {
    next();
  }
}

module.exports = start;
