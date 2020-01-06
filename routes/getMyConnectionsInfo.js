//This file is responsible for the main feuture of Milestone 3. It has router controller for Adding, Deleting
//and the rest of the program logic. It uses Session mainly to maintain All User and UserConnections.

var express = require("express");
var router = express.Router();
var session = require("express-session");
var bodyParser = require("body-parser");
router.use(session({ secret: "abcd" }));
var alert = require('alert-node');
const { check, validationResult } = require("express-validator");

var userProfData = require("./../util/userProfile");
//Maintains the login session for all the pages since this is the page which directs
//all the pages into logged in situation
var getConnectionPerUser = require("./../util/connectionPerUser");

var getLoginSession = async function(req, res, next) {
  //var getUser = require("./../util/userDB");
  //var userData = await getUser.getUser(); //Choosing the first user inside that function's definition
  //console.log("user data", userData);
  var userInputs=req.body;

  if(userInputs.userName && userInputs.password){

    var isLogin = await userProfData.getLoginCond(userInputs);
    console.log('islogin i', isLogin);
    var getUserObj = require('../util/userDB')

    if(isLogin.length >=1){
      isLoginFlag = true;
      console.log('islogin 2',isLogin);
      var userObj = await getUserObj.getUser(isLogin[0].userId);
      req.session.theUser = userObj[0];
      console.log('req the user',req.session.theUser );
      req.session.loginFlag = true;
      req.session.incorrectInput = false;
      console.log('login success bro');
    }
    else{
      console.log('login fail');
      req.session.theUser = null;
      req.session.loginFlag = false;
      req.session.incorrectInput = true;
      req.session.invalidText = "Either Username or Password are Invalid"
      // res.render('login',{loginFlag:req.session.loginFlag, invalidText:req.session.invalidText});

    }
  }
  else if(req.session.loginFlag == true){
    //
  }
  else{
    req.session.loginFlag = false;
    req.session.invalidText = "Either Username or Password are missing"
    // res.render('login',{loginFlag:req.session.loginFlag, invalidText:invalidText});
  }
  //gets all conections for user. The function is fetched from connectionPerUser.js in Util folder

  // res.getUserConnectionData= getUserConnectionData;
  // console.log("getuconn Datatatatat:",getUserConnectionData);

  //Gets the loginFlag to maintain the session
  // if (req.session.loginFlag != true) {
  //   req.session.userConnections = getUserConnectionData;
  // }

  // req.session.theUser = userData[0];
  // req.session.loginFlag = true;
  next();
};

router.use(getLoginSession);

router.get("/", async function(req, res) {
  var loginFlag = false;
  if (req.session.loginFlag) {
    console.log('cons',req.session.loginFlag);
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
      myConnection_data: getUserConnectionData,
      user:req.session.theUser.firstName
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
      res.render("404", { loginFlag: false ,user:req.session.theUser.firstName});
    } else {
      var getUserConnectionData = await getConnectionPerUser.getConnectionPerUser(
        req.session.theUser.userId
      );
      res.render("myConnections", {
        loginFlag: loginFlag,
        myConnection_data: getUserConnectionData,
        user:req.session.theUser.firstName
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
      if(req.session.loginFlag == false){
        invalidText = "Please login before you RSVP"
        res.render('login',{loginFlag: false, invalidText:invalidText, user:""});
      }
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
          res.render("404", { loginFlag: req.session.loginFlag , user:req.session.theUser.firstName});
        }
        res.render("myConnections", {
          myConnection_data: userConn,
          loginFlag: req.session.loginFlag,
          user:req.session.theUser.firstName
        });
      }
      else{
        res.render("404", { loginFlag: req.session.loginFlag , user:req.session.theUser.firstName});
      }
    }
  } else {
    req.session.destroy();
    res.render("404", { loginFlag: false,user:req.session.theUser.firstName });
  }
});

router.post("/",async function (req, res){
  console.log('loginflag post', req.session.loginFlag);
  if(req.session.loginFlag){
    var userConn = await getConnectionPerUser.getConnectionPerUser(req.session.theUser.userId);
    res.render('myConnections',{myConnection_data:userConn, loginFlag: req.session.loginFlag, user:req.session.theUser.firstName})
  }
  else{
    res.render('login',{loginFlag:false, invalidText:req.session.invalidText, user:""})
  }
})

module.exports = router;
