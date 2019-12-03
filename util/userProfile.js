var getConnections = require("../util/connectionDB");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myEvents");
var userConnnectionInfo = require("../models/userConnection");
var getConnections = require("../util/connectionDB");
//Adding a connection || Updating a connection
var addUpdateConn = async function(ConnId, rsvp, userObj) {
  //var userConnObj = [];
  console.log("inside addupdate", ConnId, rsvp);
  var getConnectionPerUser = await userConnnectionInfo.find(
    { ConnId: ConnId, userId: userObj.userId },
    function(err, resConnection) {
      if (err) throw err;
      if (resConnection[0]) {
        console.log("ucucuc", resConnection);
        return resConnection;
      } else {
        console.log("errorConn", err);
        return null;
      }
    }
  );

  console.log("Saved connections  ", getConnectionPerUser);
  if (getConnectionPerUser.length > 0) {
    await userConnnectionInfo.findOneAndUpdate(
      { ConnId: ConnId, userId: userObj.userId },
      { $set: { rsvp: rsvp } },
      { new: true },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("findUpdate", res);
        }
      }
    );
    return true;
  } else if (getConnectionPerUser.length == 0) {
    var connectionData = await getConnections.getConnection(ConnId);
    if (!connectionData[0]){
      return false;
    }
    console.log("data connectiondatatata", connectionData);
    var connectionData = {
      topic: connectionData[0].topic,
      ConnName: connectionData[0].ConnName,
      rsvp: rsvp,
      ConnId: connectionData[0].uid,
      userId: userObj.userId
    };
    console.log("Final", connectionData);
    var doc = new userConnnectionInfo(connectionData);
    console.log("final doc", doc);
    await doc.save();
    return true;
  }
};

var removeConnection = async function(ConnId, userId) {
  await userConnnectionInfo.deleteOne(
    { ConnId: ConnId, userId: userId },
    function(err, res) {
      if (err) {
        console.log("rem err", err);
        return 0;
      } else if(res){
        return res.deletedCount;
      }
    }
  );
};
//Emply profile as mentioned in rubrics. For future references
var emptyProfile = function(sessionTemp) {
  return [];
};

module.exports.removeConnection = removeConnection;
module.exports.addUpdateConn = addUpdateConn;
