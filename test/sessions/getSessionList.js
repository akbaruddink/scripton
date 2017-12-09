const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Get Sessions Scenario : ", function() {

    it("Getting Sessions Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .get("/api/session")
      .set({access_token: nconf.get('access_token')})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        done();
      });

    });

  });
}
