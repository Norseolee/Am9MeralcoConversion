// mainRoutes.js
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const checkAuth = require('../Middleware/audthMiddleware');
const permission = require('../Middleware/checkPermission');
const { verifyToken , generateToken } = require('../tokenUtils');
const bcrypt = require('bcryptjs');

const User = require('../Models/userModel');
const Meralco = require('../Models/meralcoModel');
const Tenant = require('../Models/tenantModel');
const Role = require('../Models/roleModel');
const Payment = require('../Models/paymentModel');
const ModeofPayment = require('../Models/modePaymentModel');


// THIS IS COMMON ROUTES
const checkViewPermission = async (req, res, next) => {
    const view = req.query.view || 'user';
    const permissions = {
        user: 'view_user',
        tenant: 'view_tenant',
        meralco: 'view_utility',
        maynilad: 'view_utility',
        payment: 'view_payment'
    };

    const permission = permissions[view];

    if (!permission) {
        return res.status(400).json({ message: 'Invalid view type' });
    }

    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.session.user.id;
        const user = await User.query().findById(userId);

        if (user && user[permission] === 1) {
            next();
        } else {
            req.flash('message', { text: 'You do not have permission to view this page', type: 'danger' });
            const previousUrl = req.headers.referer || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        console.error('Error in view permission middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Route handler for all dashboards
router.get('/dashboard', checkAuth, checkViewPermission,  async (req, res) => {
    try {
        let mainUserData, tenantData, meralcoData, roleData, paymentData;

        mainUserData = req.user; 
        
        // This is for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 14;
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
                    }).orderBy('meralco_id', 'desc').limit(17).offset(offset)
                    .withGraphFetched('tenant') 
                ]);
                break;
                case 'payment':
                    [totalCount, paymentData] = await Promise.all([
                        Payment.query().resultSize(),
                        Payment.query()
                            .withGraphFetched('[meralco, tenant, modepayment]')
                            .modifyGraph('tenant', builder => {
                                builder.select('*'); 
                            })
                            .modifyGraph('meralco', builder => {
                                builder.select('*'); 
                            })
                            .limit(limit)
                            .offset(offset)
                    ]);
                    break;                
            case 'user':
            default:
                [totalCount, data] = await Promise.all([
                    User.query().where('is_deleted', 0).resultSize(),
                    User.query().where('is_deleted', 0).limit(limit).offset(offset)
                ]);
                break;
            case 'user':
        }

        const totalPages = Math.ceil(totalCount / limit);

        roleData = await Role.query();

        const notificationMessage = req.flash('message');

        res.render('./pages/dashboard', { 
            mainUser: mainUserData, 
            userData: data,       
            tenantData: tenantData, 
            meralcoData: meralcoData,
            paymentData: paymentData, 
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