var express = require("express");
var app = express();
var path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static("assets"));

//Routes variables are declared here
//getConnections and getSingleConnection have to be created by express.router since it is more practical.
var getConnections = require("./routes/getConnectionsInfo");
var getSingleConnection = require("./routes/getSingleConnectionInfo");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/newConnection", function(req, res) {
  res.render("newConnection");
});

app.get("/savedConnection", function(req, res) {
  res.render("savedConnection");
});
//Following are using router object in getonnectionsinfo.js and getSingleConnection.js files in routes folder
app.use("/connections", getConnections);
app.use("/connection", getSingleConnection);

app.get("/*", function(req, res) {
  res.render("404");
});

app.listen(8080);
