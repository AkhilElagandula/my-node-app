const mongoose = require('mongoose');

const otpLogSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otp: { type: String, required: true },
  status: { type: String, enum: ['success', 'failure'], required: true }, // Success or failure
  reason: { type: String }, // Reason for failure (if applicable)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OtpLog', otpLogSchema);