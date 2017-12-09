'use strict'
const logger = require('winston');
const nconf = require('nconf');
logger.setLevels({
  trace: 9,
  input: 8,
  verbose: 7,
  prompt: 6,
  debug: 5,
  info: 4,
  data: 3,
  help: 2,
  warn: 1,
  error: 0
});

logger.addColors({
  trace: 'magenta',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  debug: 'blue',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  error: 'red'
});

logger.remove(logger.transports.Console)

let transport = logger.transports.Console
let options = {
  level: 'trace',
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false
}
if(nconf.get('isTesting')){
  transport = logger.transports.File
  options.filename = nconf.get("logFiles:winston")
}
logger.add(transport, options);
