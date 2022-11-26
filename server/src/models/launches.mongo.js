const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    require: true,
  },
  mission: {
    type: String,
    require: true,
  },
  rocket: {
    type: String,
    require: true,
  },
  launchDate: {
    type: Date,
    require: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    require: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Launch", launchSchema);
