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
  //google api call search using attraction and state
  //google api rseponse 
  //add all info into db
  var userinputAttrac = req.body.attraction
  var userinputState = req.body.state


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

// ===============================================================================================
// PASSPORT ROUTES (copied from https://github.com/manjeshpv/node-express-passport-mysql) ========
// ===============================================================================================
  module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
              successRedirect : '/profile', // redirect to the secure profile section
              failureRedirect : '/login', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
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

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
      });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });
  };

  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }

// ====================================
// End passport routes section ========
// ====================================
