const should = require('should')
const mongoose = require("mongoose");
const nconf = require("nconf")

module.exports = function(server) {
  describe("Disable Two Factor Scenario : ", function() {

    it("Missing Nothing, It Should Not Show Error");

    it("Trying to Disable 2FA Again, It Should Show Error");

  });
}
