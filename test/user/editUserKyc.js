const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Edit User KYC Scenario : ", function() {

    it("Editing KYC Documents, Card Documents upload Only, It Should Not Return Error");

    it("Editing KYC Documents, Address Proof Documents upload Only, It Should Not Return Error");

    it("Editing Address Proof ID Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({addressProofId: "12a2as54as"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing IFSC Code Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({IFSCCODE: "ICICI0001"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing Card Name Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({cardName: "Facebook"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing Card Number Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({cardNumber: "12548Abc"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing Account Name Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({accountName: "Facebook"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing Account Number Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user/kyc")
      .set({access_token: nconf.get('access_token')})
      .send({accountNumber: "123456789987654321"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        res.body.data.nModified.should.equal(1);
        done();
      });

    });

    it("Editing Everything, It Should Not Return Error");

  });
}
