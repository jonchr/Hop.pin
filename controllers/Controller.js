var express = require("express");
var app = express();

var session  = require("cookie-session");
var cookieParser = require('cookie-parser');
var passport = require("passport");
var flash    = require('connect-flash');

require('../config/passport')(passport); // pass passport for configuration

var models = require("../models");
var Attractions = models.Attractions; 

app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
  secret: "teammodest",
  resave: true,
  saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Create all our routes and set up logic within those routes where required.
//If you're not logged in, sends you to the login path
app.get("/", isLoggedIn, function(req, res) {
  Attractions.findAll({}).then(function (data){
    console.log("you are in home route");

    //If not logged in
    res.render("index", { 
      attractions: data, 
      whichPartial: function() { return "googAutoFill"; },
      user: req.user
    });   
    console.log(req.user);
  });
});

app.post("/", function(req, res) {
  //add all info into db
  var userinputlat = req.body.lat;
  var userinputlng = req.body.lng;
  var userinputattr = req.body.name;
  var userinputstate = req.body.state;

  Attractions.create(
  {
    "attraction": userinputattr,
    "state": userinputstate,
    "lat": userinputlat,
    "lng":userinputlng,
    "route" :"theroute"
  }).then(function() {
    res.redirect("/");
  });
});

app.get("api/:id", function(req, res) {
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

app.get("/login", function(req, res) {

  res.render('index', { 
    whichPartial: function() { return "login";}
    });

});

// process the login form
app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/fail', // redirect back to the signup page if there is an error
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

  console.log("Not logged in");
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

// =====================================
// SIGNUP ==============================
// =====================================

app.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  
  res.render('partials/signup.handlebars');

  //This below link loads the index page with the signup in the modal
  // res.render('index', { whichPartial: function() { return "signup";} });
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
}));

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Export routes for server.js to use.
module.exports = app;

