const routes = require('require-dir')();

module.exports = function(server){
  describe("Starting Upload Tests", function(){
    // Object.keys(routes).forEach(function(routeName) {
    //   require("./"+routeName)(server)
    // });
     require("./upload")(server)
  })
}
