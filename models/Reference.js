const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  word: { type: String, required: true },
});

module.exports = mongoose.model("Reference", referenceSchema);
