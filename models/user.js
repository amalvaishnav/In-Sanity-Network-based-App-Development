var user = function(userId, firstName, lastName, email) {
   //This represents a user modal. 
    var userModel = {
      userId: userId,
      firstName: firstName,      
      lastName: lastName,
      email: email
    };
    return userModel;
  };
  
  module.exports.user = user;
  