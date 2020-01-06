var getConnections = require("../util/connectionDB");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myEvents");
var userConnnectionInfo = require("../models/userConnection");
var getConnections = require("../util/connectionDB");
var getLoginData = require("../models/login");
var getUserData = require("../models/user");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("abcd");
//Adding a connection || Updating a connection
var addUpdateConn = async function(ConnId, rsvp, userObj) {
  //var userConnObj = [];
  console.log("inside addupdate", ConnId, rsvp);
  var getConnectionPerUser = await userConnnectionInfo.find(
    { ConnId: ConnId, userId: userObj.userId },
    function(err, resConnection) {
      if (err) throw err;
      if (resConnection[0]) {
        console.log("ucucuc", resConnection);
        return resConnection;
      } else {
        console.log("errorConn", err);
        return null;
      }
    }
  );

  console.log("Saved connections  ", getConnectionPerUser);
  if (getConnectionPerUser.length > 0) {
    await userConnnectionInfo.findOneAndUpdate(
      { ConnId: ConnId, userId: userObj.userId },
      { $set: { rsvp: rsvp } },
      { new: true },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("findUpdate", res);
        }
      }
    );
    return true;
  } else if (getConnectionPerUser.length == 0) {
    var connectionData = await getConnections.getConnection(ConnId);
    if (!connectionData[0]) {
      return false;
    }
    console.log("data connectiondatatata", connectionData);
    var connectionData = {
      topic: connectionData[0].topic,
      ConnName: connectionData[0].ConnName,
      rsvp: rsvp,
      ConnId: connectionData[0].uid,
      userId: userObj.userId
    };
    console.log("Final", connectionData);
    var doc = new userConnnectionInfo(connectionData);
    console.log("final doc", doc);
    await doc.save();
    return true;
  }
};

var removeConnection = async function(ConnId, userId) {
  await userConnnectionInfo.deleteOne(
    { ConnId: ConnId, userId: userId },
    function(err, res) {
      if (err) {
        console.log("rem err", err);
        return 0;
      } else if (res) {
        return res.deletedCount;
      }
    }
  );
};
//Emply profile as mentioned in rubrics. For future references
var emptyProfile = function(sessionTemp) {
  return [];
};

var getLoginCond = async function(userInput) {
  const respLogin = await getLoginData.find(
    { userName: userInput.userName },
    function(err, conn) {
      if (err) throw err;

      if (conn) {
        console.log("our conn login", conn);
        return conn;
      } else {
        console.log("login error", err);
        return null;
      }
    }
  );
  if (respLogin[0]) {
    console.log("userInput", userInput);
    console.log("resp login", respLogin);
    enc1 = cryptr.encrypt(userInput.password);
    enc2 = respLogin[0].password;
    console.log("enc2", enc2);
    dec1 = cryptr.decrypt(enc1);
    dec2 = cryptr.decrypt(enc2);
    console.log("dec1", dec1);

    if (cryptr.decrypt(enc1) == cryptr.decrypt(enc2)) {
      console.log("matched");
      return respLogin;
    } else {
      console.log("out else");
      return [];
    }
  }
  else{
    return [];
  }
};

var getSignupCond = async function(signupObj) {
  console.log("signup util", signupObj);

  const loginData = {
    userId: signupObj.email,
    userName: signupObj.email,
    password: cryptr.encrypt(signupObj.password)
  };
  const userData = {
    userId: signupObj.email,
    firstName: signupObj.firstName,
    lastName: signupObj.lastName,
    email: signupObj.email
  };

  var updateRes1 = "";
  var updateRes2 = "";
  const retUserData = await getUserData.findOneAndUpdate(
    { email: userData.email },
    {
      $set: {
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    },
    { new: true },
    function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("findUpdate 1", res);
        if (res) {
          updateRes1 = true;
        } else {
          updateRes1 = null;
        }
      }
    }
  );
  if (updateRes1 == null) {
    var doc = new getUserData(userData);
    console.log("final user data doc", doc);
    await doc.save();

    var doc = new getLoginData(loginData);
    console.log("final login data doc", doc);
    await doc.save();
    console.log("2 docs saved");
    return true;
  } else {
    return false;
  }

  // const retLoginData = await getLoginData.findOneAndUpdate(
  //   { userName: loginData.userName },
  //   { $set: { password:loginData.password } },
  //   { new: true },
  //   function(err, res) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("findUpdate 2", res);
  //       updateRes2 = res;
  //     }
  //   }
  // );
};

module.exports.removeConnection = removeConnection;
module.exports.addUpdateConn = addUpdateConn;
module.exports.getSignupCond = getSignupCond;
module.exports.getLoginCond = getLoginCond;
