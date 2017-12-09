const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Login Senarios : ", function() {
    it("Missing Email, It should return error", function(done) {
      this.timeout(3000)
      // calling home page api
      server
        .post("/api/auth/login")
        .send({password: "dasdasdasdas"})
        .expect("Content-type", /json/)
        .expect(nconf.get("status:badRequest")) // THis is HTTP response
        .end(function(err, res) {
          // Error key should be false.
          res.body.status.should.equal(false);
          done();
        });
    });

    it("Missing Password, It should return error",function(done){

      // calling home page api
      server
      .post("/api/login")
      .send({email : "someemail@email.com"})
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

    it("Nothing Missing, It should not return any error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/auth/login")
      .send({email : "someemail@email.com",password : "123456"})
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.status.should.equal(true);
        nconf.set('access_token', res.body.data.access_token)
        done();
      });

    });

  });
}
