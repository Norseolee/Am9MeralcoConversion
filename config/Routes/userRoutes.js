const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const User = require('../Models/userModel');
const Meralco = require('../Models/meralcoModel');
const Tenant = require('../Models/tenantModel');
const Role = require('../Models/roleModel');
const checkAuth = require('../Middleware/audthMiddleware');
const { generateToken } = require('../generateToken');
const { verifyToken } = require('../verifyToken');
const bcrypt = require('bcrypt');
const multer = require('multer');

const NodeCache = require("node-cache");
const notificationCache = new NodeCache();


// Route handler for user login
router.post('/login', async (req, res) => {
    const { username, password, remember_me } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await User.query().findOne({ username: username });

        if (user) {
            // Compare the entered password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
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
                // Password doesn't match
                res.redirect('/');
            }
        } else {
            // User not found
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route handler for user logout
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


// Route handler for all dashboards
// router.get('/dashboard', async (req, res) => {
//     try {
//         let userData, meralcoData, tenantData, roleData;
//         let session_user_id = req.session.user;

//         // Check if the user is logged in through session
//         if (req.session.user) {
//             // Retrieve user data
//             userData = await User.query().findById(req.session.user.id);
//         } else if (req.cookies.remember_token) {
//             // Authenticate user using remember token
//             const user = await verifyToken(req.cookies.remember_token);
//             if (user) {
//                 // Store user in session
//                 req.session.user = user;
//                 // Retrieve user data
//                 userData = await User.query().findById(user.id);
//             } else {
//                 // Redirect to login if user cannot be authenticated
//                 return res.redirect('/');
//             }
//         } else {
//             // Redirect to login if user session or token is not found
//             return res.redirect('/');
//         }

//         // THis is for paginations
//         const page = parseInt(req.query.page) || 1;
//         const limit = 15;
//         const view = req.query.view || 'user';
//         const offset = (page - 1) * limit;

//         let data, totalCount;

//         switch(view) {
//             case 'tenant':
//                 [totalCount, data] = await Promise.all([
//                     Tenant.query().resultSize(),
//                     Tenant.query().limit(limit).offset(offset)
//                 ]);
//                 break;
//             case 'meralco':
//                 [totalCount, data] = await Promise.all([
//                     Meralco.query().resultSize(),
//                     Meralco.query().limit(limit).offset(offset)
//                 ]);
//                 break;
//             case 'user':
//             default:
//                 [totalCount, data] = await Promise.all([
//                     User.query().resultSize(),
//                     User.query().limit(limit).offset(offset)
//                 ]);
//                 break;
//         }

//         const totalPages = Math.ceil(totalCount / limit);

//         roleData = await Role.query();

//         res.render('./pages/dashboard', { 
//             user: userData, 
//             data: data, 
//             currentPage: page, 
//             totalPages: totalPages,
//             view: view,
//             roles: roleData,
//             session_user: session_user_id,
//         });
        
//     } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
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
                    Tenant.query().resultSize(),
                    Tenant.query().limit(limit).offset(offset)
                ]);
                break;
            case 'meralco':
                [totalCount, meralcoData] = await Promise.all([
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

        roleData = await Role.query();

        const notificationMessage = notificationCache.get("notification");
        console.log(notificationMessage);

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
        res.status(500).send('Internal Server Error');
    }
});

// Route handler for add new user
router.post("/user_process/add-user", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
        let role = parseInt(req.body.role);

        // Insert the user into the database with the hashed password
        const user = await User.query().insert({
            username: req.body.username,
            password: hashedPassword, 
            role_id: role, 
        });
        notificationCache.set("notification", { type: 'success', text: 'User added successfully' }, 3); // 3 seconds TTL
        res.redirect('/dashboard?view=user');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route handler for edit user
router.post('/user_process/edit-user', async (req, res) => {
    try {
        if (req.session.user && req.session.user.id === 1) {
            let userId = req.query.id;
            let role = parseInt(req.body.role);
            let { username, password } = req.body;


            let updateFields = {
                username: username,
                role_id: role,
            };

            // Only hash and update the password if provided
            if (password) {
                let hashedPassword = await bcrypt.hash(req.body.password, 10);
                updateFields.password = hashedPassword;
            }
            const updatedUser = await User.query().patchAndFetchById(userId, updateFields);

            notificationCache.set("notification", { type: 'success', text: 'User updated successfully' }, 3);
            res.redirect('/dashboard?view=user');
        } else {
            notificationCache.set("notification", { type: 'error', text: 'Only Admin can edit any user' }, 3);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route handler for delete user
router.get('/user_process/delete-user', async (req, res) => {
    try {
        // Check if 'do' parameter is provided and equals 'delete'
        if (req.query.do === 'delete') {
            // Check if 'id' parameter is provided
            if (!req.query.id) {
                return res.status(400).send('User ID is missing.');
            }

            const userIdToDelete = req.query.id;
            const loggedInUserId = req.session.user.id; // Assuming the logged-in user ID is stored in session

            // Prevent deletion if the user is trying to delete themselves
            if (userIdToDelete === loggedInUserId) {
                return res.status(400).send('You cannot delete yourself.');
                
            }
            
            // Delete the user with the provided ID
            await User.query().deleteById(userIdToDelete);
            
            // Redirect back to the dashboard or any other appropriate page
            notificationCache.set("notification", { type: 'success', text: 'user deleted successfully' }, 3);
            res.redirect('/dashboard?view=user');
        } else {
            notificationCache.set("notification", { type: 'error', text: 'Invalid action' }, 3);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Routes handler for preview image
const upload = multer();

router.post('/preview', upload.single('signature'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Process the image to grayscale
        const processedImageBuffer = await sharp(req.file.buffer)
            .greyscale() 
            .threshold(100) 
            .toFormat('jpeg', { quality: 100 })
            .toBuffer();

        // Convert buffer to base64
        const base64Image = `data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`;

        // Send the processed image data back as a response
        res.send({ base64Image });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image.');
    }
});

// Export the router
module.exports = router;
