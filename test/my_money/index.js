const routes = require('require-dir')();

module.exports = function(server){
  describe("Starting My Money Tests", function(){
    // Object.keys(routes).forEach(function(routeName) {
    //   require("./"+routeName)(server)
    // });
     require("./getWalletBalance")(server)
     require("./getHistory")(server)
     require("./sendBtc")(server)
     require("./sendCurrency")(server)
     require("./withdrawBtc")(server)
     require("./withdrawCurrency")(server)
  })
}
