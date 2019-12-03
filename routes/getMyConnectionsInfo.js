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
var getConnectionPerUser = require("./../util/connectionPerUser");

var getLoginSession = async function(req, res, next) {
  var getUser = require("./../util/userDB");
  var userData = await getUser.getUser(); //Choosing the first user inside that function's definition
  //console.log("user data", userData);

  //gets all conections for user. The function is fetched from connectionPerUser.js in Util folder

  // res.getUserConnectionData= getUserConnectionData;
  // console.log("getuconn Datatatatat:",getUserConnectionData);

  //Gets the loginFlag to maintain the session
  // if (req.session.loginFlag != true) {
  //   req.session.userConnections = getUserConnectionData;
  // }

  req.session.theUser = userData[0];
  req.session.loginFlag = true;
  next();
};

var getUserProfile = require("./../util/userProfile");
router.use(getLoginSession);

router.get("/", async function(req, res) {
  var loginFlag = false;
  if (req.session.loginFlag) {
    loginFlag = true;
  }
  var q = req.query;

  //If no add or delete is present in query parameters. So by default it should
  //head to login.
  if (q.action == "BlankLoginNoParams") {
    var getUserConnectionData = await getConnectionPerUser.getConnectionPerUser(
      req.session.theUser.userId
    );
    res.render("myConnections", {
      loginFlag: loginFlag,
      myConnection_data: getUserConnectionData
    });
    //RemoveConnection Handler
  } else if (q.action == "delete") {
    var connection_data = await userProfData.removeConnection(
      q.connectionId,
      req.session.theUser.userId
    );
    console.log("conn data Main:", connection_data);
    if (connection_data == 0) {
      req.session.destroy();
      res.render("404", { loginFlag: false });
    } else {
      var getUserConnectionData = await getConnectionPerUser.getConnectionPerUser(
        req.session.theUser.userId
      );
      res.render("myConnections", {
        loginFlag: loginFlag,
        myConnection_data: getUserConnectionData
      });
    }
    //Adding or Updating tackled in a single Utility.
  } else if (q.action == "add") {
    if (
      String(q.rsvp).includes("Yes") ||
      String(q.rsvp).includes("Maybe") ||
      String(q.rsvp).includes("No")
    ) {
      console.log("q.rsvp", q.rsvp);
      var connection_flag = await userProfData.addUpdateConn(
        q.connectionId,
        q.rsvp,
        req.session.theUser
      );
      if (connection_flag == true) {
        var userConn = await getConnectionPerUser.getConnectionPerUser(
          req.session.theUser.userId
        );
        if (userConn == null) {
          res.render("404", { loginFlag: req.session.loginFlag });
        }
        res.render("myConnections", {
          myConnection_data: userConn,
          loginFlag: req.session.loginFlag
        });
      }
      else{
        res.render("404", { loginFlag: req.session.loginFlag });
      }
    }
  } else {
    req.session.destroy();
    res.render("404", { loginFlag: false });
  }
});

module.exports = router;
