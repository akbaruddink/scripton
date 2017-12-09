const _package = require('../../package.json')
const nconf = require('nconf')

let status = {
	"badRequest" : 400,
	"unauthorized" : 401,
	"notFound" : 404,
	"serverError" : 500
}

nconf.set('migrationVersion', _package.migrationVersion || 0)

let limitO = {

}

nconf.set('status', status)

nconf.set('limitO',limitO)
