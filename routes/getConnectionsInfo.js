var express = require("express");
var router = express.Router();
//Here a route is defined for getting all the connections in 'connections.ejs'
//It renders connections page and passes parameter as a whole object to ejs file.
router.get("/", async function(req, res) {
  var getDB = require("./../util/connectionDB");
  var connectionsData =await getDB.getConnections();
  //console.log(connectionsData);
  //getDB  above is function created 
  //in util folder for getting a database "connectiondata.json"
  var unique_topic = [...new Set(connectionsData.map(data=>data.topic))]
  if (connectionsData) {
  }
  res.render("connections", { connectionObj: connectionsData, unique_topic:unique_topic, loginFlag:req.session.loginFlag });
});

module.exports = router;
