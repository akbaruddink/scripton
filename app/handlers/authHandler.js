const logger = require('winston');
const basicHelper = require('../helpers/basicHelper');
const userModel = require('../models/userModel');
const authorizeUser = async (request, response, next) => {
  let access_token = request.headers.access_token
  if(!access_token){
    return basicHelper.generateUnauthorizedResponse(response, new Error("access_token header is required"));
  }

  let decoded
  try{
    decoded = basicHelper.verifyToken(access_token)
  }catch(err){
    return basicHelper.generateUnauthorizedResponse(response, new Error("invalid access_token"));
  }

  let userRow = await userModel.findById(decoded._id)
  if(!userRow){
    return  basicHelper.generateUnauthorizedResponse(response);
  }
  //Write your any initilization logic here

  response.locals.decoded = decoded
  response.locals.userRow = userRow
  next()
}

const signup = async (request, response) => {
  let {username, password} = request.body
  if(!username || !password){
    return basicHelper.generateUnauthorizedResponse(response)
  }

  let userRow = new userModel({
    username,
    password
  })
  try{
    await userRow.save()
  }catch(err){
    return basicHelper.generateUnauthorizedResponse(response, new Error("username already registered"));
  }

  let access_token = basicHelper.createToken({_id: userRow._id})
  response.json({status: true, data:{
    access_token,
    id: userRow._id
  }})
}

const login = async (request, response) => {
  let body = request.body
  if(!body.username || !body.password){
    return basicHelper.generateUnauthorizedResponse(response)
  }

  let userRow = await userModel.findOne({username: body.username, password: body.password})
  if(!userRow){
    return basicHelper.generateUnauthorizedResponse(response);
  }

  let access_token = basicHelper.createToken({_id: userRow._id})
  response.json({status: true, data:{
    access_token,
    id: userRow._id
  }})
}

const authHandler = {
  authorizeUser,
  login,
  signup
}

module.exports = authHandler
