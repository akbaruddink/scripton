const nconf = require('nconf');

let aws = {
  accessKeyId: "",
  secretAccessKey: "",
  signatureVersion: 'v4',
  bucket: "",
  emailRegion: "https://email.us-west-2.amazonaws.com"
}

let database = {
  url: "mongodb://localhost:27017/test",
  migrationUrl: "mongodb://localhost:27017/test_migration"
}

nconf.set('debug', true)
nconf.set('database', database)
nconf.set('port', 5000)
nconf.set('secretKey', "DEVELOPMENT_SECRET_KEY")
nconf.set('aws', aws)
