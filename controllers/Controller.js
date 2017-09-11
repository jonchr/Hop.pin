var express = require("express");

var router = express.Router();

// Import the model (medicine.js) to use its database functions.
// var medicine = require("../models/medicine.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log("you are in home route");
  res.render("index");
});

router.post("/", function(req, res) {
  [model].create([
    "name", "state"
  ], [
    req.body.name, req.body.state
  ], function() {
    res.redirect("/");
  });
});

router.get("api/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  medicine.get(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
