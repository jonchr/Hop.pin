var express = require("express");
var router = express.Router();

var session  = require("express-session");
var passport = require("passport");
require('../config/passport')(passport); // pass passport for configuration

var models = require("../models");
var Attractions = models.Attractions; 

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  Attractions.findAll({}).then(function (data){
    console.log("you are in home route");

    //If not logged in
    res.render("index", {attractions: data, whichPartial: function() { return "googAutoFill"; } });   
  })
});

router.post("/", function(req, res) {
  //google api call search using attraction and state
  //google api rseponse 
  //add all info into db
  var userinputAttrac = req.body.attraction
  var userinputState = req.body.state

  Attractions.create([
    "attraction", "state", "lat", "lng"
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

// =====================================
// LOGIN ===============================
// =====================================

router.get("/login", function(req, res) {

  res.render('index', { whichPartial: function() { return "login";} });

});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
}),
  function(req, res) {
    console.log("hello");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
  res.redirect('/');
  });

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// =====================================
// SIGNUP ==============================
// =====================================

router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  
  res.render('partials/signup.handlebars');

  //This below link loads the index page with the signup in the modal
  // res.render('index', { whichPartial: function() { return "signup";} });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
}));

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Export routes for server.js to use.
module.exports = router;

