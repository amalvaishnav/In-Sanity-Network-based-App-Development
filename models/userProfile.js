var user = function(uid, firstName, lastName, email) {
  //User profile model which modelizes user's profile. It doesn't do anything for now. It states in a rubrics to have this file for future reference.
    var userModel = {
      uid: uid,
      firstName: firstName,      
      lastName: lastName,
      email: email
    };
    return userModel;
  };
  
  module.exports.user = user;
  