var express = require("express");
var router = express.Router();
// this is a route defined for getting a single connection after clicking each individual entry in connections.ejs
//Here model is used for connection but "uid" is not created dynamically since there is no form created from post request by form.Navbar
//So will update that part later
router.get("/", function(req, res) {
  var connectionModel = require("./../models/connection");
  var getDB = require("./../util/connectionDB");
  if (req.query.connectionID) {
    var connectionSingleData = getDB.getConnection(req.query.connectionID);
    if (connectionSingleData==null){
      res.render("404", { loginFlag:req.session.loginFlag});
    }
    connectionModel = connectionModel.connection(
      connectionSingleData.uid,
      connectionSingleData.topic,
      connectionSingleData.ConnName,
      connectionSingleData.details,
      connectionSingleData.date,
      connectionSingleData.time,
      connectionSingleData.location
    );
    res.render("connection", { connectionObj: connectionModel ,  loginFlag:req.session.loginFlag});
  } else {
    res.send("Invalid info");
  }
});

module.exports = router;
