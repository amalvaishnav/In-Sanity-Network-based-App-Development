//This file is responsible for the main feuture of Milestone 3. It has router controller for Adding, Deleting
//and the rest of the program logic. It uses Session mainly to maintain All User and UserConnections.

var express = require("express");
var router = express.Router();
var session = require("express-session");
var bodyParser = require("body-parser");
router.use(session({ secret: "abcd" }));

var userProfData = require("./../util/userProfile");

//Maintains the login session for all the pages since this is the page which directs 
//all the pages into logged in situation
var getLoginSession = function(req, res, next) {
  var getUser = require("./../util/userDB");
  var userData = getUser.getUser(1111);
  var userModel = require("./../models/user");
  var userModel = userModel.user(
    userData.userId,
    userData.firstName,
    userData.lastName,
    userData.email
  );

  //gets all conections for user. The function is fetched from connectionPerUser.js in Util folder
  var getUserConnection = require("./../util/connectionPerUser");
  var getUserConnectionData = getConnectionPerUser.getConnectionPerUser(
    "u1111"
  );
 
  //Gets the loginFlag to maintain the session
  if (req.session.loginFlag != true) {
    req.session.userConnections = getUserConnectionData;
  }

  req.session.theUser = userModel;
  req.session.loginFlag = true;
  next();
};

var getConnectionPerUser = require("./../util/connectionPerUser");
var getUserProfile = require("./../util/userProfile");
router.use(getLoginSession);

router.get("/", function(req, res) {
  var loginFlag = false;
  if (req.session.loginFlag) {
    loginFlag = true;
  }
  var q = req.query;

  //If no add or delete is present in query parameters. So by default it should
  //head to login. 
  if (q.action == "BlankLoginNoParams") {
    res.render("myConnections", {
      loginFlag: loginFlag,
      myConnection_data: req.session.userConnections
    });
  //RemoveConnection Handler
  } else if (q.action == "delete") {
    var connection_data = userProfData.removeConnection(
      q.connectionId,
      req.session.userConnections
    );
    console.log(connection_data);
    if (connection_data == null) {
      res.render("404", { loginFlag: req.session.loginFlag });
    }
    req.session.userConnections = connection_data;
    res.render("myConnections", {
      loginFlag: loginFlag,
      myConnection_data: req.session.userConnections
    });

  //Adding or Updating tackled in a single Utility.
  } else if (q.action == "add") {
    if (
      String(q.rsvp).includes("Yes") ||
      String(q.rsvp).includes("Maybe") ||
      String(q.rsvp).includes("No")
    ) {
      var connection_data = userProfData.addConnection(
        q.connectionId,
        q.rsvp,
        req.session.userConnections,
        req.session.theUser
      );
      if (connection_data == null) {
        res.render("404", { loginFlag: req.session.loginFlag });
      }
      req.session.userConnections = connection_data;

      res.render("myConnections", {
        loginFlag: loginFlag,
        myConnection_data: req.session.userConnections
      });
    }
  }
  res.render("404", { loginFlag: req.session.loginFlag });
});

module.exports = router;
