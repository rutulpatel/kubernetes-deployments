var express = require("express");
var router = express.Router();
var os = require("os");

var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./application.properties");

var VERSION = properties.get('VERSION');
console.log(VERSION);

router.get("/", function(req, res) {
    var response = "<h1>Kubernetes Deployments Project</h1>" +
                    "<h3>Serving from: " + os.hostname() + "</h3>"  +
                    "<h3>Application version: " + VERSION + "</h3>";
    res.send(response);
});

module.exports = router;