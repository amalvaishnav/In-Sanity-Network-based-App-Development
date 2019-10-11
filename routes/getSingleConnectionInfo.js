var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    var connectionModel = require("./../models/connection");
    var getDB = require("./../util/connectionDB");
   //console.log(req.query.connectionID);
    if (req.query.connectionID){
        var connectionSingleData = getDB.getConnection(req.query.connectionID);
        console.log(connectionSingleData.ConnName);
        connectionModel= connectionModel.connection(
            connectionSingleData.uid,
            connectionSingleData.topic,
            connectionSingleData.ConnName,
            connectionSingleData.details,
            connectionSingleData.time,
            connectionSingleData.date,
            connectionSingleData.location
        );
        res.render("connection",{connectionObj: connectionModel});   
    }
    else{
        res.send("Invalid info");
    }
    
});

module.exports = router;