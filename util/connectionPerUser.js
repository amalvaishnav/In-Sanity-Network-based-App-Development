const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "/connectionPerUser.json");
const rawdata = fs.readFileSync(certPath);

var ConnectionPerUserData = JSON.parse(rawdata);
var ConnObjGlobal=[]

//Each connections for particular use is controlled here.
var getConnectionPerUser = function(id) {
    var ConnObj=[];
    for (var i in ConnectionPerUserData) {
        if (ConnectionPerUserData[i].userId == id) {
            ConnObj = ConnObj.concat(ConnectionPerUserData[i]);
            ConnObjGlobal = ConnObj;
            
        }
    }
    return ConnObjGlobal;
};

module.exports = {
    getConnectionPerUser: getConnectionPerUser,
};
  