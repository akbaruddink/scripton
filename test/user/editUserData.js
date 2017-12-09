const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Edit User Data Scenario : ", function() {

    it("Editing Name Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({name: "Lol"})
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

    it("Editing State Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({state: "Delhi"})
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

    it("Editing City Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({city: "Something"})
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

    it("Editing Address Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({address: "Something"})
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

    it("Editing Pincode Only, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({pincode: 500017})
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

    it("Editing Everything, It Should Not Return Error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/user")
      .set({access_token: nconf.get('access_token')})
      .send({name: "face", state: "Maharashtra", city: "Mumbai", address: "powai",pincode: "500017"})
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

  });
}
