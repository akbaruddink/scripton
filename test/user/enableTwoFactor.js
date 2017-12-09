const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Enable Two Factor Scenario : ", function() {

    it("Missing Nothing, It Should Not Show Error", function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/enable-two-factor")
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

    it("Trying to enable 2FA Again, It Should Show Error", function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/enable-two-factor")
      .set({access_token: nconf.get('access_token')})
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(400);
        // Error key should be false.
        res.body.status.should.equal(false);
        done();
      });

    });

  });
}
