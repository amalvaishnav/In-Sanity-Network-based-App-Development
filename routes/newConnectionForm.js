var express = require("express");
var router = express.Router();
var session = require("express-session");
var bodyParser = require("body-parser");
var alert = require('alert-node');
const { check, validationResult } = require("express-validator");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(session({ secret: "abcd" }));
router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false
  })
);

router.post(
  "/",
  [
    check("topic")
      .not()
      .isEmpty()
      .withMessage("Enter Topic Name"),
    check("ConnName")
      .not()
      .isEmpty()
      .withMessage("Enter Connection name"),
    check("details")
      .not()
      .isEmpty()
      .withMessage("Enter description"),
    check("location")
      .not()
      .isEmpty()
      .withMessage("Enter location"),
    check("date")
      .not()
      .isEmpty()
      .withMessage("Enter dates"),
    check("time")
      .not()
      .isEmpty()
      .withMessage("Enter Time")
  ],
  async function(req, res) {
    var getDB = require("./../util/connectionDB");
    console.log("new form data", req.body);
    
    const errors = validationResult(req);
    console.log("erros alert", errors.array());
    msg = "";
    if (!errors.isEmpty()) {
      console.log("er len", errors.array().length);
      
      for (i = 0; i < errors.array().length; i++) {
        msg = msg + "\n" + (i+1) +" --"+errors.array()[i].msg;
      }
      console.log(msg);
      // return res.status(422).json({errors: errors.array()})
    alert(
        msg
    );
    
    }
   // console.log("a", a);
    if(msg!=''){
      res.redirect("newConnection");
    }
    let a = await getDB.addNewConnection(req.body);
    if (a == 1) {
      res.redirect("connections");
    } else if (a == 0) {
      res.send("Record already exists............");
    } 
  }
);

module.exports = router;
