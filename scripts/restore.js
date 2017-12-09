var restore = require('mongodb-restore');

console.log(restore({
  uri: 'mongodb://localhost:27017/exbot2', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
  root: __dirname + '/../backups/exbot'
}));
