const routes = require('require-dir')();

module.exports = function(server){
  describe("Starting User Tests", function(){
    // Object.keys(routes).forEach(function(routeName) {
    //   require("./"+routeName)(server)
    // });
     require("./editUserData")(server)
     require("./editUserKyc")(server)
     require("./getUserData")(server)
     require("./getUserKyc")(server)
     require("./enableTwoFactor")(server)
     require("./testTwoFactor")(server)
     require("./disableTwoFactor")(server)
  })
}
