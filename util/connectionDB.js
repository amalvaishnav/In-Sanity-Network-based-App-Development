const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "/connectionData.json");
const rawdata = fs.readFileSync(certPath);
//I have used JSON as a database here---> "connectionData.json" in the same directory
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myEvents");
var connnectionInfo = require("../models/connection");

function addNewConnection(connectionData) {
  //console.log("connData", connectionData);
  const uid =
    connectionData.topic.slice(0, 2) +
    connectionData.ConnName.slice(0, 2) +
    connectionData.location.slice(0, 2) +
    connectionData.date.slice(0, 2) +
    connectionData.time.slice(0, 2);
  //console.log("uid", uid);
  const connTemp = {
    uid: uid,
    topic: connectionData.topic,
    ConnName: connectionData.ConnName,
    details: connectionData.details,
    location: connectionData.location,
    date: connectionData.date,
    time: connectionData.time
  };
  return connnectionInfo
    .find({ uid: uid })
    .exec()
    .then(async function(res) {
     // console.log("respond", res.length);
      if (res.length == 0) {
        var data = new connnectionInfo(connTemp);
        console.log("uniqid",data);
        await data.save();
        return 1;
      } else {
        //console.log("else connnnnnnnn");
        return 0;
      }
    })
    .catch(function(err) {
      //console.log(err);
      return 2;
    });
}
//To get all the connections
var getConnections = function() {
  return connnectionInfo.find({}, function(err, resArray) {
    if (err) throw err;
    if (resArray) {
      //console.log(resArray);
      return resArray;
    } else {
      return null;
    }
  });
};

var getConnection = function(id) {
  return connnectionInfo.find({ uid: id }, function(err, resArray) {
    if (err) throw err;
    if (resArray) {
      //console.log(resArray);
      return resArray;
    } else {
      return null;
    }
  });
};

//for individual connection
// var getConnection = function(id) {
//   for (var i in connectionData) {
//     if (connectionData[i].uid == id) {
//       return connectionData[i];
//     }
//   }
// };

module.exports = {
  addNewConnection: addNewConnection,
  getConnection: getConnection,
  getConnections: getConnections
};
