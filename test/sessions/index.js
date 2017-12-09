const routes = require('require-dir')();

module.exports = function(server){
  describe("Starting Session Tests", function(){
    // Object.keys(routes).forEach(function(routeName) {
    //   require("./"+routeName)(server)
    // });
     require("./getSessionList")(server)
  })
}
