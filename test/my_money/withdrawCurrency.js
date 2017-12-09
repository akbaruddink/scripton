const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Withdraw Currency Scenario : ", function() {

    it("Missing Amount, It Should Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/withdraw/currency")
      .set({access_token: nconf.get('access_token')})
      .send({})
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

    it("Missing Nothing, It Should Return Bad Request Because No Balance",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/withdraw/currency")
      .set({access_token: nconf.get('access_token')})
      .send({amount: "1"})
      .expect("Content-type",/json/)
      .expect(500) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(500);
        // Error key should be false.
        res.body.status.should.equal(false);
        done();
      });

    });

  });
}
