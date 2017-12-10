const basicHelper = require('../helpers/basicHelper');
const productModel = require('../models/productModel');
const createProduct = async (request, response) => {

  let data = request.body
  if(!data){
    return  basicHelper.generateBadRequestResponse(response);
  }
  let productRow = new productModel({
    user: response.locals.decoded._id,
    name: data.name,
    data: data.data
  })
  console.log(productRow.data);
  await productRow.save()
  response.json({status: true, data: productRow})
}

const getProductList = async (request, response) => {
  let user = response.locals.decoded._id
  let productList = await productModel.find({user}).sort({createdAt: -1}).lean()
  response.json({status: true, data: productList})
}

const getProductById = async (request, response) => {
  let _id = request.params.productId
  let product = await productModel.find({_id}).lean()
  response.json({status: true, data: product})
}

const productHandler = {
  createProduct,
  getProductList,
  getProductById
}

module.exports = productHandler
