const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const Meralco = require('../Models/meralcoModel');
const Tenant = require('../Models/tenantModel');
const checkAuth = require('../Middleware/audthMiddleware');
const { generateToken } = require('../generateToken');
const { verifyToken } = require('../verifyToken');

// Route handler for user login
router.post('/login', async (req, res) => {
    const { username, password, remember_me } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await User.authenticate(username, password);

        if (user) {
            req.session.user = user;

            // Check if "Remember me" is selected
            if (remember_me) {
                // Generate a unique token (e.g., JWT)
                const token = generateToken(user);

                // Set token in a cookie (set expiration time to 30 days)
                res.cookie('remember_token', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            }

            res.redirect('/dashboard?view=user');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', checkAuth, (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.clearCookie('remember_token');
            res.redirect('/');
        }
    });
});

router.get('/dashboard', async (req, res) => {
    try {
        let userData, meralcoData, tenantData;

        // Check if the user is logged in through session
        if (req.session.user) {
            // Retrieve user data
            userData = await User.query().findById(req.session.user.id);

            // Retrieve data from other models
            // [meralcoData, tenantData] = await Promise.all([
            //     User.query(),
            //     Meralco.query(),
            //     Tenant.query()
            // ]);
        } else if (req.cookies.remember_token) {
            // Authenticate user using remember token
            const user = await verifyToken(req.cookies.remember_token);
            if (user) {
                // Store user in session
                req.session.user = user;

                // Retrieve user data
                userData = await User.query().findById(user.id);

                // Retrieve data from other models
                // [meralcoData, tenantData] = await Promise.all([
                //     User.query(),
                //     Meralco.query(),
                //     Tenant.query()
                // ]);
            } else {
                // Redirect to login if user cannot be authenticated
                return res.redirect('/');
            }
        } else {
            // Redirect to login if user session or token is not found
            return res.redirect('/');
        }

        // THis is for paginations
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const view = req.query.view || 'user';
        const offset = (page - 1) * limit;

        let data, totalCount;

        switch(view) {
            case 'tenant':
                [totalCount, data] = await Promise.all([
                    Tenant.query().resultSize(),
                    Tenant.query().limit(limit).offset(offset)
                ]);
                break;
            case 'meralco':
                [totalCount, data] = await Promise.all([
                    Meralco.query().resultSize(),
                    Meralco.query().limit(limit).offset(offset)
                ]);
                break;
            case 'user':
            default:
                [totalCount, data] = await Promise.all([
                    User.query().resultSize(),
                    User.query().limit(limit).offset(offset)
                ]);
                break;
        }

        const totalPages = Math.ceil(totalCount / limit);

        res.render('./pages/dashboard', { 
            user: userData, 
            data: data, 
            currentPage: page, 
            totalPages: totalPages,
            view: view,
        });
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router
module.exports = router;
