var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");


var userConnectionSchema = new mongoose.Schema({
  topic:{
    type: String,
    required: "Please provide topic."
  },
  ConnName:{
    type: String,
    required: "Please provide ConnName."
  },
  rsvp:{
    type: String,
    required: "Please provide rsvp."
  },
  userId:{
    type: String,
    required: true
  },
  ConnId:{
    type: String,
    required: true
  },
  uniqueId:{
    type: Number,
    required: true
  }
}, { collection: "connectionPerUserData" })

autoIncrement.initialize(mongoose.connection);

userConnectionSchema.plugin(autoIncrement.plugin, {
  model: "userConnection",
  field: "uniqueId",
  startAt: 100,
  incrementBy: 5
});

module.exports = mongoose.model("userConnections", userConnectionSchema); 