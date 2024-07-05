// authMiddleware.js
const { verifyToken } = require('../tokenUtils');
const User = require('../Models/userModel');

const checkAuth = async (req, res, next) => {
  try {
      if (req.session && req.session.user) {
          req.user = await User.query().findById(req.session.user.id);
      } else if (req.cookies.remember_token) {
          const user = await verifyToken(req.cookies.remember_token);
          if (user) {
              req.session.user = user;
              req.user = await User.query().findById(user.id);
          } else {
              req.flash('message', { text: 'wrong password', type: 'danger' });
              return res.redirect('/');
          }
      } else {
          return res.redirect('/');
      }
      next();
  } catch (error) {
      console.error('Error in authentication:', error);
      req.flash('message', { text: 'Internal Server Error', type: 'danger' });
      res.redirect('/');
  }
};
  
  module.exports = checkAuth;
  