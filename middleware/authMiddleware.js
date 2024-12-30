const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports.isAdmin = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = user; // Attach user to request object
    next();
  }
  catch(error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
}
