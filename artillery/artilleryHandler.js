let possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let possibleStringLength = possibleString.length
let possibleNumber = "0123456789";
let possibleNumberLength = possibleNumber.length
function generateRandomString(length) {
  let text = "";
  for (var i = 0; i < length; i++)
    text += possibleString.charAt(Math.floor(Math.random() * possibleStringLength));
  return text;
}
function generateRandomNumber(length) {
  let text = "";
  for (var i = 0; i < length; i++)
    text += possibleNumber.charAt(Math.floor(Math.random() * possibleNumberLength));
  return text;
}
const data = {

}

const artilleryHandler = {
  generateSignupRequest: (requestParams, context, ee, next) => {
    let email = generateRandomString(5)+"@a.com"
    data[context._uid] = {}
    data[context._uid].email = email
    requestParams.json = {
      "email": email,
      "password": "123456",
      "mobile": "+91"+generateRandomNumber(10)
    }
    next()
  },
  generateLoginRequest: (request, context, ee, next) => {
    request.json = {
      email: data[context._uid].email,
      password: "123456"
    }
    next()
  },
  handleLoginResponse: (request, response, context, ee, next) => {
    data[context._uid].accessToken = response.body.data.access_token
    next()
  },
  addAccessToken: (request, context, ee, next) => {
    request.headers = {
      access_token: data[context._uid].accessToken
    }
    data.currentLoginIndex++
    next()
  },
  handleGetTokenDetailsResponse: (request, response, context, ee, next) => {
    console.log(response.body);
    next()
  },
  testRes: (requestParams, res, context, ee, next) => {
    console.log(res.body);
    next()
  }
}
module.exports = artilleryHandler
