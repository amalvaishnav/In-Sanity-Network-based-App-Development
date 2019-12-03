const fs = require("fs");
const path = require("path");
// const certPath = path.join(__dirname, "/userData.json");

// var userData = JSON.parse(rawdata);

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myEvents");
var userInfo = require("../models/user");
//Fetches all users and individual user which has been implemented in login sessions
//and Connection representation for each user.
var getUsers = function() {
  return userData;
};

var getUser = function() {
  return userInfo.find({}, function(err, resArray) {
    if (err) throw err;
    if (resArray) {
      //console.log("suer data",resArray);
      return resArray;
    } else {
      return null;
    }
  });
};

module.exports = {
  getUsers: getUsers,
  getUser: getUser
};
