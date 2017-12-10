const express = require('express');
const productHandler = require('../handlers/productHandler');
const app = express()

app.get('/:productId', productHandler.getProductById)
module.exports = app
