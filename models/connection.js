var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var connectionSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: "Please provide topic."
  },
  ConnName: {
    type: String,
    required: "Please provide Connection Name."
  },
  details: {
    type: String,
    required: "Please provide some details."
  },
  date: {
    type: String,
    required: "Please provide date."
  },
  time: {
    type: String,
    required: "Please provide time."
  },
  location: {
    type: String,
    required: "Please provide location."
  }
}, { collection: "connectionData" });

// autoIncrement.initialize(mongoose.connection);
// connectionSchema.plugin(autoIncrement.plugin, {
//   model: "connection",
//   field: "uid",
//   startAt: 10000,
//   incrementBy: 1
// });

// module.exports.connection = connection;
module.exports = mongoose.model("connection", connectionSchema);
