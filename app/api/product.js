const express = require('express');
const productHandler = require('../handlers/productHandler');
const app = express()

app.get('/', productHandler.getProductList)
app.get('/:productId', productHandler.getProductById)
app.post('/', productHandler.createProduct)

module.exports = app
