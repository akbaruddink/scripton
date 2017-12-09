const express = require('express')
const authHandler = require('../handlers/authHandler');
const api = express();

api.post('/login', authHandler.login)
api.post('/signup', authHandler.signup)

module.exports = api;
