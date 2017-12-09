const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server){
  describe("Sign Up Senarios : ", function(){
    it("Missing Email, It should return error", function(done){
      this.timeout(3000)
      // calling home page api
      server
      .post("/api/auth/signup")
      .send({password : "dasdasdasdas"})
      .expect("Content-type",/json/)
      .expect(nconf.get("status:badRequest")) // THis is HTTP response
      .end(function(err,res){
        // Error key should be false.
        res.body.status.should.equal(false);
        done();
      });
    });

    it("Missing Password, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
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

    it("Invalid Email, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({email : "invalid email",password : "123456"})
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

    it("Missing Name, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({email : "someemail@email.com",password : "123456"})
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

    it("Missing Mobile, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456"})
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

    it("kashif i cahnged this Missing Address, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202"})
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

    it("Missing Country, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad"})
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

    it("Missing State, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad", country: "India"})
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

    it("Missing City, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad", country: "India", state: "Telangana"})
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

    it("Missing Pincode, It should return error",function(done){

      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad", country: "India", state: "Telangana", city: "Hyderabad"})
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

    it("Creating User 1 With Nothing Missing, It should not return any error"
    // ,function(done){
    //   this.timeout(10000)
    //   // calling home page api
    //   server
    //   .post("/api/auth/signup")
    //   .send({name: "kashif", email : "someemail@email.com",password : "123456", mobile: "+919849011202", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad", country: "India", state: "Telangana", city: "Hyderabad", pincode: 500016, isIndividual: true})
    //   .expect("Content-type",/json/)
    //   .expect(200) // THis is HTTP response
    //   .end(function(err,res){
    //     // HTTP status should be 200
    //     res.status.should.equal(200);
    //     // Error key should be false.
    //     res.body.status.should.equal(true);
    //     done();
    //   });
    //
    // }
  );

    it("Creating User 2 With Nothing Missing, It should not return any error",function(done){
      this.timeout(10000)
      // calling home page api
      server
      .post("/api/auth/signup")
      .send({name: "akbar", email : "email@email.com",password : "123456", mobile: "+919849011201", address: "H.No. 6-3-1177/A/88, Begumpet, Hyderabad", country: "India", state: "Telangana", city: "Hyderabad", pincode: 500016, isIndividual: true})
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
