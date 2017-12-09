const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Get History Scenario : ", function() {

    it("Getting All History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: true, isCredit: true, isCurrency: true, isBtc: true})
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

    it("Getting isDebit History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: true, isCredit: false, isCurrency: true, isBtc: true})
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

    it("Getting isCredit History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: false, isCredit: true, isCurrency: true, isBtc: true})
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

    it("Getting isDebit Currency Only History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: true, isCredit: false, isCurrency: true, isBtc: false})
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

    it("Getting isCredit Currency Only History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: false, isCredit: true, isCurrency: true, isBtc: false})
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

    it("Getting isDebit Btc Only History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: true, isCredit: false, isCurrency: false, isBtc: true})
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

    it("Getting isCredit Btc Only History Without Any Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/my-money/history")
      .set({access_token: nconf.get('access_token')})
      .send({isDebit: false, isCredit: true, isCurrency: false, isBtc: true})
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
