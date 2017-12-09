var backup = require('mongodb-backup');

backup({
  uri: 'mongodb://localhost:27017/exbot', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase> 
  root: __dirname
});
