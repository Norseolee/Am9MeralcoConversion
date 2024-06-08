// THIS IS USER ROUTES
const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../verifyToken');

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
        req.flash('message', { text: 'User added successfully', type: 'success' });
        res.redirect('/dashboard?view=user');
    } catch (error) {
        req.flash('message', { text: 'Error: add user not successful', type: 'success' });
        res.redirect('/dashboard?view=user');
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

            req.flash('message', { text: 'User updated successfully', type: 'success' });
            res.redirect('/dashboard?view=user');
        } else {
            req.flash('message', { text: 'Only Admin can edit any user', type: 'danger' });
        }
    } catch (error) {
        req.flash('message', { text: 'Internal Error', type: 'danger' });
        res.redirect('/dashboard?view=user');
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
                req.flash('message', { text: 'You cannot delete yourself', type: 'danger' });
                return res.redirect('/dashboard?view=user');
            }
            
            // Delete the user with the provided ID
            await User.query().findById(userIdToDelete).patch({ is_deleted: 1 });
            
            // Redirect back to the dashboard or any other appropriate page
            req.flash('message', { text: 'user deleted successfully', type: 'success' });
            res.redirect('/dashboard?view=user');
        } else {
            req.flash('message', { text: 'Invalid action', type: 'danger' });
        }
    } catch (error) {
        req.flash('message', { text: 'Error deleting user:', type: 'danger' });
        res.redirect('/dashboard?view=user');
    }
});

module.exports = router;