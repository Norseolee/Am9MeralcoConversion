const jwt = require('jsonwebtoken');

// Define the generateToken function
function generateToken(user) {
    const secretKey = process.env.JWT_SECRET; // Retrieve secret key from environment variable
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '30d' });
    return token;
}

module.exports = { generateToken }; // Export the function
