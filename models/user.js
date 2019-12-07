var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: "Please provide First Name."
    },
    lastName: {
      type: String,
      required: "Please provide Last Name."
    },
    email: {
      type: String,
      required: "Please provide Email Address."
    }
  },
  { collection: "userData" }
);

// module.exports.user = user;

// userSchema.plugin(autoIncrement.plugin,{
//   model:'user',
//   field:'userId',
//   startAt:10000,
//   incrementBy: 2
// })

module.exports = mongoose.model("user", userSchema);
