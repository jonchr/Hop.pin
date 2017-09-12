// set up ======================================================================
var express = require("express");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var morgan = require('morgan');

var passport = require('passport');
var flash    = require('connect-flash');

require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 3000;

var app = express();
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/Controller.js");

app.use("/", routes);

db.sequelize.sync({ force: true}).then(function() {
	app.listen(port);
});