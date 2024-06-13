// permissionMiddleware.js
const User = require('../Models/userModel');

const checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Fetch the user's permissions from the database
            const userId = req.session.user.id;
            const user = await User.query().findById(userId);

            // Check if the user has the required permission
            if (user && user[permission] === 1) {
                next(); // User has permission, proceed to the next middleware/route handler
            } else {
                req.flash('message', { text: 'You do not have Permission to do this', type: 'danger' });
                const previousUrl = req.headers.referer || '/';
                res.redirect(previousUrl);
            }
        } catch (error) {
            console.error('Error in permission middleware:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = checkPermission;
