// mainRoutes.js
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const User = require('../Models/userModel');
const Meralco = require('../Models/meralcoModel');
const Tenant = require('../Models/tenantModel');
const Role = require('../Models/roleModel');
const checkAuth = require('../Middleware/audthMiddleware'); // Fixed typo
const { generateToken } = require('../generateToken');
const { verifyToken } = require('../verifyToken');
const bcrypt = require('bcrypt');
const multer = require('multer');

// THIS IS COMMON ROUTES

// Route handler for all dashboards
router.get('/dashboard', async (req, res) => {
    try {
        let mainUserData, tenantData, meralcoData, roleData;

        // Check if the user is logged in through session
        if (req.session.user) {
            // Retrieve main user data (currently logged-in user)
            mainUserData = await User.query().findById(req.session.user.id);
        } else if (req.cookies.remember_token) {
            // Authenticate user using remember token
            const user = await verifyToken(req.cookies.remember_token);
            if (user) {
                // Store user in session
                req.session.user = user;
                // Retrieve main user data
                mainUserData = await User.query().findById(user.id);
            } else {
                // Redirect to login if user cannot be authenticated
                return res.redirect('/');
            }
        } else {
            // Redirect to login if user session or token is not found
            return res.redirect('/');
        }

        // This is for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const view = req.query.view || 'user';
        const offset = (page - 1) * limit;

        let data, totalCount;

        switch(view) {
            case 'tenant':
                [totalCount, tenantData] = await Promise.all([
                    Tenant.query().where('is_deleted', 0).resultSize(),
                    Tenant.query().where('is_deleted', 0).limit(limit).offset(offset)
                ]);
                break;
            case 'meralco':
                [totalCount, meralcoData] = await Promise.all([
                    Meralco.query().where(builder => {
                        builder.where('is_deleted', 0);
                    }).resultSize(),
                    Meralco.query().where(builder => {
                        builder.where('is_deleted', 0);
                    }).orderBy('meralco_id', 'desc').limit(limit).offset(offset)
                ]);
                break;
            case 'user':
            default:
                [totalCount, data] = await Promise.all([
                    User.query().where('is_deleted', 0).resultSize(),
                    User.query().where('is_deleted', 0).limit(limit).offset(offset)
                ]);
                break;
        }

        const totalPages = Math.ceil(totalCount / limit);

        roleData = await Role.query();

        const notificationMessage = req.flash('message');

        res.render('./pages/dashboard', { 
            mainUser: mainUserData, 
            userData: data,       
            tenantData: tenantData, 
            meralcoData: meralcoData, 
            currentPage: page, 
            totalPages: totalPages,
            view: view,
            roles: roleData,
            notificationMessage: notificationMessage,
        });
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('message', { text: 'Internal Server Error', type: 'danger' });
        res.redirect('/');
    }
});

// THIS IS LOGIN AND LOGOUT ROUTES
// Route handler for user login
router.post('/login', async (req, res) => {
    const { username, password, remember_me } = req.body;

    if (!username || !password) {
        req.flash('message', { text: 'Username and password are required', type: 'danger' });
        return res.redirect('/');
    }

    try {
        const user = await User.query().findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                req.session.user = user;
                if (remember_me) {
                    const token = generateToken(user);
                    req.flash('message', { text: 'Successfully logged in', type: 'success' });
                    res.cookie('remember_token', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                }

                res.redirect('/dashboard?view=user');
            } else {
                req.flash('message', { text: 'Invalid password', type: 'danger' });
                res.redirect('/');
            }
        } else {
            req.flash('message', { text: 'User not found', type: 'danger' });
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        req.flash('message', { text: 'Internal Server Error', type: 'danger' });
        res.redirect('/');
    }
});

// Route handler for user logout
router.get('/logout', checkAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            req.flash('message', { text: 'Internal Server Error', type: 'danger' });
            res.redirect('/');
        } else {
            res.clearCookie('remember_token');
            res.redirect('/');
        }
    });
});


module.exports = router;