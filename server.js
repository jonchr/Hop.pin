// set up ======================================================================
var express = require("express");
var session  = require("express-session");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var app = express();
var db = require("./models");

var passport = require("passport");
require('./config/passport')(passport); // pass passport for configuration

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
	secret: "teammodest",
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/Controller.js");

app.use("/", routes);

db.sequelize.sync({ force: true}).then(function() {
	app.listen(port);
});