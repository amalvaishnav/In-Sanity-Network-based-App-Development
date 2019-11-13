var getConnections = require("../util/connectionDB");

//Adding a connection || Updating a connection
var addConnection = function(ConnId, rsvp, userConnections) {
  var userConnObj = [];
  for (var i = 0; i < userConnections.length; i++) {
    var userConnObj = userConnections[i];
    //If connection already presented, rsvp is changed.
    if (userConnObj.ConnId == ConnId)
      return updateConnection(ConnId, rsvp, userConnections, i);
  }
  //Otherwise do the new connection
  var connection = getConnections.getConnection(ConnId);
  //Invalid Connection id returns 404 by returning null in the controller
  if (typeof connection == "undefined") {
    return null;
  }

  var userConnObj = {
    topic: connection.topic,
    ConnName: connection.ConnName,
    rsvp: rsvp,
    userId: "u1111",
    ConnId: ConnId
  };

  userConnections = userConnections.concat(userConnObj);
  return userConnections;
};

//Update connection used in add
var updateConnection = function(ConnId, rsvp, userConnections, i) {
  userConnections[i].rsvp = rsvp;
  return userConnections;
};
//Delete a connection
var removeConnection = function(connId, userConn) {
  var connection = getConnections.getConnection(connId);
  if (typeof connection == "undefined") {
    return null;
  }  
  var userConnObj = [];
  for (var i = 0; i < userConn.length; i++) {
    if (userConn[i].ConnId == connId) {
      //pass (DO NOTHING)
    } else {
      console.log("Inside else : ", i);
      userConnObj = userConnObj.concat(userConn[i]);
    }
  }

  return userConnObj;
};
//Emply profile as mentioned in rubrics. For future references
var emptyProfile = function(sessionTemp) {
  return [];
};

module.exports.removeConnection = removeConnection;
module.exports.addConnection = addConnection;
