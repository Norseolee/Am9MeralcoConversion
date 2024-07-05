// tokenUtils.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
