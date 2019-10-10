var express = require("express");
var router = express.Router();


router.get("/", function(req,res){
    var connectionModel = require("./../models/connection");
    var getConnections = require("./../util/connectionDB");
    console.log(getConnections.getConnections());
   

});

module.exports=router;