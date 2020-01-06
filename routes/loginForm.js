var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var userProfData = require("./../util/userProfile");
var alert = require('alert-node');
const { check, validationResult } = require("express-validator");
router.get("/",async function(req,res){
    invalidText=""
    res.render('login',{loginFlag:false, invalidText:invalidText});
});

router.post("/",
[
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("Enter First Name"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("Enter Last name"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Enter email"),
    check("password")
      .not()
      .isEmpty().isLength({min:8})
      .withMessage("Enter password (should be minimum 8 characters)"),

  ]
, async function(req,res){
    console.log("sign up post body", req.body);
 
    const errors = validationResult(req);
    console.log("erros alert", errors.array());
    msg = "";
    if (!errors.isEmpty()) {
        console.log("er len", errors.array().length);
        
        for (i = 0; i < errors.array().length; i++) {
            if (errors.array()[i].msg == "Invalid value"){
                continue
            }
          msg = msg + "\n" + (i+1) +" --"+errors.array()[i].msg;
        }
        console.log(msg);
        // return res.status(422).json({errors: errors.array()})
      alert(
          msg
      );
      
      }
      if(msg!=''){
        res.redirect("signup");
      }  
    var loginObj = await userProfData.getSignupCond(req.body);  
    if (loginObj==true){
        res.render('login', {loginFlag:false, invalidText:"New Record Added "});
    }
    else{
        console.log('sign up needed.....');
        res.render('login', {loginFlag:false, invalidText:"Email already exists,we updated rest of the records. Lets login again"});
   
    }
})

module.exports = router;