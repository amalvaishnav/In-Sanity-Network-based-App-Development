var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({ secret: "abcd" }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static("assets"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false
  })
);
//Routes variables are declared here
//getConnections and getSingleConnection have to be created by express.router since it is more practical.
var getConnections = require("./routes/getConnectionsInfo");
var getSingleConnection = require("./routes/getSingleConnectionInfo");
var getMyConnections = require("./routes/getMyConnectionsInfo");
var newConnectionForm = require("./routes/newConnectionForm");
var loginForm = require("./routes/loginForm");
var signupForm = require("./routes/signupForm");
//I maintained a LoginFlag variable and stored in session. Now it is responsible for every
//action in this Milestone.
//Middleware for login. It is the first thing app checks for login session
app.use(function(req, res, next) {
  if (req.session && req.session.loginFlag && req.session.loginFlag == true) {
    module.exports.loginFlag = req.session.loginFlag;
  } else {
    req.session.loginFlag = false;
    module.exports.loginFlag = false;
  }
  next();
});
app.get("/", function(req, res) {
  res.render("index", { loginFlag: req.session.loginFlag });
});

app.get("/index", function(req, res) {
  //console.log(req.query.params);
  res.render("index", { loginFlag: req.session.loginFlag });
});
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.render("index", { loginFlag: false });
});
app.get("/about", function(req, res) {
  res.render("about", { loginFlag: req.session.loginFlag });
});

app.get("/contact", function(req, res) {
  res.render("contact", { loginFlag: req.session.loginFlag });
});

// app.use("newConnection", newConnectionForm);

app.get("/newConnection", function(req, res) {
  res.render("newConnection", { loginFlag: req.session.loginFlag });
});

app.use("/newConnectionForm", newConnectionForm);
// console.log(req.body);
// res.render("newConnection", {loginFlag:req.session.loginFlag});

app.use("/myConnections", getMyConnections);
//Following are using router object in getonnectionsinfo.js and getSingleConnection.js files in routes folder
app.use("/connections", getConnections);
app.use("/connection", getSingleConnection);
app.use("/login", loginForm);
app.use("/signup", signupForm);

app.get("/*", function(req, res) {
  res.render("404", { loginFlag: req.session.loginFlag });
});

app.listen(8080, function() {
  console.log("app started");
  console.log("listening on port 8080");
});
