/* PROJECT DEPENDENCIES */
var express = require('express');
var exhbs = require('express-handlebars');
var db = require("./models");

/* Setup the express app */
var app = express();
var PORT = process.env.PORT || 8080;

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup application to use Handlebars
app.engine("handlebars", exhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set the public folder to server front-end data
app.use(express.static("./public"));

// Controller for the application
require("./controllers/burgers_controllers")(app);

var syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });

