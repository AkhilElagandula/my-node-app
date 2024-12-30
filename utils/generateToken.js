const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

module.exports.generateAndStoreToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // 1 hour expiration
  });

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  // Save token to the database
  await Token.create({
    userId,
    token,
    expiresAt,
  });

  return token;
};
