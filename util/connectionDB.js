const fs = require('fs');
const path = require('path');
const certPath = path.join(__dirname,  "/connectionData.json");
const rawdata = fs.readFileSync(certPath);

var connectionData= JSON.parse(rawdata);
//console.log(connectionData);
var getConnections=function (){
    return connectionData;
} 

var getConnection = function(id){
    //console.log('conn', connectionData);

    for (var key in connectionData){
        if(connectionData.hasOwnProperty(key)){
            return connectionData[key];
        }
    }


    // Object.keys(connectionData).forEach(function(item){
    //     //console.log('item', connectionData[item].uid);
    //     if(connectionData[item].uid==id){
    //         console.log(connectionData[item]);
    //         return connectionData[item];             
    //     }
    // })


}

module.exports={
    getConnection:getConnection,
    getConnections:getConnections
}
// module.exports.getConnections=getConnections;
// module.exports.getConnection=getConnection;