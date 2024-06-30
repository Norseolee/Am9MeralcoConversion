// permissionMiddleware.js
const User = require('../Models/userModel');

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        const view = req.query.view || 'user';
        const permissions = {
            user: 'view_user',
            tenant: 'view_tenant',
            meralco: 'view_utility',
            maynilad: 'view_utility',
            payment: 'view_payment'
        };

        let permission = permissions[view];

        // Override permission if requiredPermission is provided
        if (requiredPermission !== '') {
            permission = requiredPermission;
        }
        
        console.log(`Checking permission: ${permission}`); // Log permission for debugging

        try {
            if (!req.session || !req.session.user) {
                console.log('Unauthorized');
                req.flash('message', { text: 'Unauthorized', type: 'danger' });
                res.setHeader('Refresh', '0; URL=' + req.url); 
            }
            
            const userId = req.session.user.id;
            const user = await User.query().findById(userId);
            console.log(`Checking permission: ${permission} and ${user.id}`)
            if ((user && user[permission] === 1) || user.role_id === 1) {
                next();
            } else {
                req.flash('message', { text: 'You do not have permission to view this page', type: 'danger' });
                res.setHeader('Refresh', '0; URL=' + req.url); 
            }
        } catch (error) {
            console.error('Error in view permission middleware:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = checkPermission;
