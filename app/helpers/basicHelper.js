const jsonwebtoken = require('jsonwebtoken')
const nconf = require('nconf');
function getErrorResponseObject(response, options){
	let responseObject = {
		error: {}
	}
	if(options && options.message){
			responseObject.error.message = options.message
	}else {
		if(typeof options === 'object'){
			responseObject = options
		}else{
			responseObject.error.message = options
		}
	}
	responseObject.status = false
	response.locals.responseObject = responseObject
	return responseObject
}

function generateBadRequestResponse(response,options){
	let responseObject = getErrorResponseObject(response, options)
	response.status(nconf.get("status:badRequest")).json(responseObject)
}

function generateUnauthorizedResponse(response,options){
	let responseObject = getErrorResponseObject(response, options)
	response.status(nconf.get("status:unauthorized")).json(responseObject)
}

function generateServerErrorResponse(response,options){
	let responseObject = getErrorResponseObject(response, options)
	response.status(nconf.get("status:serverError")).json(responseObject)
}

function createToken(data, options){
	options = options || {}
	return jsonwebtoken.sign(data, nconf.get("secretKey"), options)
}

function verifyToken(data) {
	return jsonwebtoken.verify(data, nconf.get('secretKey'));
}

const basicHelper = {
	generateBadRequestResponse,
	generateUnauthorizedResponse,
	generateServerErrorResponse,
	createToken,
	verifyToken
}

module.exports = basicHelper
