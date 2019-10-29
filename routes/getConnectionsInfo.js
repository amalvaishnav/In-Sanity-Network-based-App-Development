var express = require("express");
var router = express.Router();
//Here a route is defined for getting all the connections in 'connections.ejs'
//It renders connections page and passes parameter as a whole object to ejs file.
router.get("/", function(req, res) {
  var getDB = require("./../util/connectionDB");
  var connectionsData = getDB.getConnections();
  //getDB  above is function created 
  //in util folder for getting a database "connectiondata.json"
  var unique_topic = [...new Set(connectionsData.map(data=>data.topic))]
  console.log(unique_topic);
  if (connectionsData) {
  }
  res.render("connections", { connectionObj: connectionsData, unique_topic:unique_topic });
});

module.exports = router;
