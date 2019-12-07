var express = require("express");
var router = express.Router();


router.get("/",async function(req,res){
    invalidText="";
    res.render('signup',{loginFlag:false, invalidText:invalidText});
});


module.exports = router;