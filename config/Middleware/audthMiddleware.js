// authMiddleware.js
const checkAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/'); // Redirect to login page if not authenticated
    }
  };
  
  module.exports = checkAuth;
  