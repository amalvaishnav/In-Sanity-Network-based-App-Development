var express = require("express");
var router = express.Router();
var session = require("express-session");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(session({ secret: "abcd" }));

router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false
  })
);


router.post("/",async function(req, res) {
  var getDB = require("./../util/connectionDB");
  let a= await getDB.addNewConnection(req.body);
  console.log('a',a);
  if (a==1){
    res.redirect("connections");
  }
  else if (a==0){
    res.send('Record already exists............')
  }
  else{
    res.send('unknown error');
  }
});

module.exports = router;
