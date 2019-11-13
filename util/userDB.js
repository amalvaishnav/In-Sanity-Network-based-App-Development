const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "/userData.json");
const rawdata = fs.readFileSync(certPath);

var userData = JSON.parse(rawdata);
//Fetches all users and individual user which has been implemented in login sessions 
//and Connection representation for each user.
var getUsers = function() {
    return userData;
  };

var getUser = function(id) {
    for (var i in userData) {
        if (userData[i].userId == id) {
        return userData[i];
    }
}

};


module.exports = {
    getUsers: getUsers,
    getUser: getUser,
};
  