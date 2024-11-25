const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  fileId: { type: String, required: true },
  matchedWords: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Record", recordSchema);
