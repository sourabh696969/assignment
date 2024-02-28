const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema({
  configId: String,
  data: [[String]],
  remark: {
    type: String,
    default: 'No Remark!'
  },
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Configuration", configurationSchema);
