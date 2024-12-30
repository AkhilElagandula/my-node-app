const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true }, // Mobile is required
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }, // Default role is 'user'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
