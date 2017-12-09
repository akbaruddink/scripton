const nconf = require('nconf');
const morgan = require('morgan')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let mongoCollection = null
MongoClient.connect(nconf.get('database:url'), onConnect)
function onConnect(error, mongoDb) {
    if (error) {
      throw error
    }

  // mongoCollection = mongodb.collection('logs')
}

const getOutputObject = (tokens, req, res) => {
  let output = {}

  output.method = req.method
  output.url = req.originalUrl
  output.status = res.statusCode
  output.responseTime = tokens['response-time'](req, res)
  output.createdAt = new Date()

  if(output.status !== 200){
    output.body = req.body
    output.responseObject = res.locals.responseObject
  }

  return output
}

const dbHandler = (tokens, req, res) => {
  try {
    let object = getOutputObject(tokens, req, res)
    // mongoCollection.insert(object)
  } catch (e) {
    console.log(e);
  }
  return [
   tokens.method(req, res),
   tokens.url(req, res),
   tokens.status(req, res),
   tokens.res(req, res, 'content-length'), '-',
   tokens['response-time'](req, res), 'ms'
 ].join(' ')

}


const getMorgan = (options) => {
  return morgan(dbHandler, options)
}

const morganHandler = {
  getMorgan
}

module.exports = morganHandler
