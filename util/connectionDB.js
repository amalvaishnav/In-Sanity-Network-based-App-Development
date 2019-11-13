const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "/connectionData.json");
const rawdata = fs.readFileSync(certPath);
//I have used JSON as a database here---> "connectionData.json" in the same directory
var connectionData = JSON.parse(rawdata);

//To get all the connections
var getConnections = function() {
  return connectionData;
};

//for individual connection
var getConnection = function(id) {
  for (var i in connectionData) {
    if (connectionData[i].uid == id) {
      return connectionData[i];
    }
  }
  
};

module.exports = {
  getConnection: getConnection,
  getConnections: getConnections
};

