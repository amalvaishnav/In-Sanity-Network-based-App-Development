var express = require("express");
var router = express.Router();
// this is a route defined for getting a single connection after clicking each individual entry in connections.ejs
//Here model is used for connection but "uid" is not created dynamically since there is no form created from post request by form.Navbar
//So will update that part later
router.get("/", async function(req, res) {
  var getDB = require("./../util/connectionDB");
  if (req.query.connectionID) {
    var connectionSingleData = await getDB.getConnection(
      req.query.connectionID
    );
    console.log("singledata", connectionSingleData);
    if (connectionSingleData[0] == null) {
      res.render("404", { loginFlag: req.session.loginFlag , user:""});
    }
    if (req.session.loginFlag == true){
      res.render("connection", {
        connectionObj: connectionSingleData[0],
        loginFlag: req.session.loginFlag,
        user:req.session.theUser.firstName
      });
    }
    else{
      res.render("connection", {
        connectionObj: connectionSingleData[0],
        loginFlag: req.session.loginFlag,
        user:""
      });
    }
   
  } else {
    res.send("Invalid info");
  }
});

module.exports = router;
