const routes = require('require-dir')();

module.exports = function(server){
  describe("Starting Auth Tests", function(){
    // Object.keys(routes).forEach(function(routeName) {
    //   require("./"+routeName)(server)
    // });
     require("./signup")(server)
     require("./login")(server)
     require("./getTokenDetails")(server)
     require("./changePassword")(server)
    //  require("./facebookTelegramLogin")(server)
  })
}
