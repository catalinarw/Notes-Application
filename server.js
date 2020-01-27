var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
// parse application
app.use(bodyParser.json());

require("./routing/api-routes.js")(app);
require("./routing/html-routes.js")(app);




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});