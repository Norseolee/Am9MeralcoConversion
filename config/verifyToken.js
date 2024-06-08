const jwt = require('jsonwebtoken');
const User = require('./Models/userModel'); // Ensure this path is correct

// Define the verifyToken function
async function verifyToken(token) {
    try {
        const secretKey = process.env.JWT_SECRET; // Retrieve secret key from environment variable
        const decoded = jwt.verify(token, secretKey);
        const user = await User.query().findById(decoded.userId); // Find user by user_id
        return user; // Return the user object
    } catch (error) {
        console.error('Error verifying token:', error);
        return null; // Return null if token verification fails
    }
}

module.exports = { verifyToken }; // Export the function
