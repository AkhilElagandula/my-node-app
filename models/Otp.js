const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otp: {
    type: String,
    required: function () {
      return this.expiresAt !== null; // Only required if expiresAt is not null
    },
  },
  expiresAt: {
    type: Date,
    required: function () {
      return this.otp !== null; // Only required if otp is not null
    },
  },
});

module.exports = mongoose.model('Otp', otpSchema);
