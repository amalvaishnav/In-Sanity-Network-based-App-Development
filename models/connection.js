//var uniqid = require("uniqid");
var connection = function(uid, topic, name, details, date, time, location) {
  // Creation of unique id dynamically will be required in the future
  //var uid = uniqid("nbad_");
  var connectionModel = {
    uid: uid,
    topic: topic,
    connName: name,
    details: details,
    date: date,
    time: time,
    location: location
  };
  console.log('mdl:',connectionModel);
  return connectionModel;
};

module.exports.connection = connection;
