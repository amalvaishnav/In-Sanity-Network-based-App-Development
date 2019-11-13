var userConnection = function(topic,ConnName, rsvp,userId,ConnId, uniqueId) {
  //Represents a user connection's Model which contains incorporation of User and Connections
  var userConnectionModel = {
    topic: topic,
    ConnName:ConnName,
    rsvp: rsvp,
    userId:userId,
    ConnId:ConnId,
    uniqueId:uniqueId
  };
  return userConnectionModel;
};


module.exports.userConnection = userConnection;