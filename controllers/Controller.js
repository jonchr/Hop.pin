var express = require("express");

var router = express.Router();

// Import the model (medicine.js) to use its database functions.
// var medicine = require("../models/medicine.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log("you are in home route");
  res.render("index.handlebars");
});

router.post("/", function(req, res) {
  Attractions.create([
    "attraction", "state", "lat", "long"
  ], [
    req.body.attraction, req.body.state, req.body.lat, req.body.long
  ], function() {
    res.redirect("/");
  });
});

router.get("api/:id", function(req, res) {
  var input = req.params.id;

  Attractions.findAll({
  where: {
    placeId: input
  }
  });
});

// Export routes for server.js to use.
module.exports = router;
