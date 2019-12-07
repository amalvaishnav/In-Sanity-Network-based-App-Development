var mongoose = require("mongoose");


var loginSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: "Please provide Email Address."
      },
      password:{
          type: String,
          required: "Please provide Password"
      }
    },
    { collection: "loginData" }
  );

  
module.exports = mongoose.model("login", loginSchema);