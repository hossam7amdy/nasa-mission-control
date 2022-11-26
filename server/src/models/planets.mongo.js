const mongoose = require("mongoose");

const plantesSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Planet", plantesSchema);
