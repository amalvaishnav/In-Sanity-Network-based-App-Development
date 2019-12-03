const fs = require("fs");
const path = require("path");
// const certPath = path.join(__dirname, "/connectionPerUser.json");
// const rawdata = fs.readFileSync(certPath);
// var ConnectionPerUserData = JSON.parse(rawdata);

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myEvents");
var userConnectionInfo = require("../models/userConnection");

var getConnectionPerUser = function(id) {
  return userConnectionInfo.find({ userId: id }, function(err, resArray) {
    if (err) throw err;
    if (resArray) {
      //console.log("ucucuc", resArray);
      return resArray;
    } else {
      return null;
    }
  });
};

module.exports = {
  getConnectionPerUser: getConnectionPerUser
};
