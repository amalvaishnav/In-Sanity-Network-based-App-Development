const fs = require('fs');
const path = require('path');
const certPath = path.join(__dirname,  "/connectionData.json");
const rawdata = fs.readFileSync(certPath);

var connectionData= JSON.parse(rawdata);
//console.log(connectionData);
var getConnections=function (){
    return connectionData;
} 

module.exports.getConnections=getConnections;