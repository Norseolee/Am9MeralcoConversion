// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');

// Define route handlers for user-related operations
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).send('Username and password are required');
  }

  try {
      const user = await User.authenticate(username, password);
      
      if (user) {
          req.session.user = user;
          res.redirect('/pages/meralco_billing');
      } else {
          res.redirect('/');
      }
  } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;