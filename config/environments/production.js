const nconf = require('nconf');

let aws = {
  accessKeyId: "",
  secretAccessKey: "",
  signatureVersion: 'v4',
  bucket: "",
  emailRegion: "https://email.us-west-2.amazonaws.com"
}

let database = {
  url: "mongodb://test:123456@ds011288.mlab.com:11288/scripton",
  migrationUrl: "mongodb://<dbuser>:<dbpassword>@ds011288.mlab.com:11288/scripton"
}

nconf.set('debug', true)
nconf.set('database', database)
nconf.set('port', process.env.PORT || process.env.port || 5000)
nconf.set('secretKey', "DEVELOPMENT_SECRET_KEY")
nconf.set('aws', aws)
