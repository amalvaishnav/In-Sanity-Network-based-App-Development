var uniqid = require("uniqid");
var connection = function(topic, name, details, date, time, location) {
  var uid = uniqid("nbad_");
  var connectionModel = {
    uid: uid,
    topic: topic,
    connName: name,
    details: details,
    date: date,
    time: time,
    location: location
  };
  return connectionModel;
};

module.exports.connection = connection;
