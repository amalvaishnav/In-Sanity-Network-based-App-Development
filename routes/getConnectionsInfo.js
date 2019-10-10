var express = require("express");
var router = express.Router();


router.get("/", function(req,res){
    var connectionModel = require("./../models/connection");
    var getConnections = require("./../util/connectionDB");
    // console.log(getConnections.getConnections());
    var connectionsData=getConnections.getConnections();
    if (connectionsData){}
    res.render("connections", {connectionObj : connectionsData });

});

module.exports=router;