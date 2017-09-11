var express = require("express");

var router = express.Router();

// Import the model (medicine.js) to use its database functions.
var medicine = require("../models/medicine.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  medicine.all(function(data) {
    var hbsObject = {
      medicine: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  medicine.create([
    "name", "dosage"
  ], [
    req.body.name, req.body.dose
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  medicine.update({
    taken: req.body.taken
  }, condition, function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  medicine.delete(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
