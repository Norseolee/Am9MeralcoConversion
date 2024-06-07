// tenantRoutes.js

const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('../verifyToken');

const Tenant = require('../Models/tenantModel');
const User = require('../Models/userModel')

//Routes handler for preview image
const upload_preview = multer();

router.post('/preview', upload_preview.single('signature'), async (req, res) => {
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

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('Uploads directory created successfully.');
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

async function processImage(file) {
    const processedImageBuffer = await sharp(file.path)
        .greyscale()
        .threshold(100)
        .toFormat('jpeg', { quality: 100 })
        .toBuffer();

    // Define the path for the processed image
    const processedImagePath = path.join(__dirname, '../../public/uploads', `processed-${Date.now()}-${file.originalname}`);
    const filename = `processed-${Date.now()}-${file.originalname}`;

    // Save the processed image
    fs.writeFileSync(processedImagePath, processedImageBuffer);

    return filename;
}

const upload = multer({ storage: storage });

// Route handler for add tenant
router.post("/tenant_process/add-tenant", upload.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'image_id_front', maxCount: 1 },
    { name: 'image_id_back', maxCount: 1 }
]), async (req, res) => {
    try {
        // Initialize variables for file paths
        let signaturePath = null;
        let frontImagePath = null;
        let backImagePath = null;

        // Check if signature file was uploaded
        if (req.files && req.files.signature) {
            signaturePath = await processImage(req.files.signature[0]);
        }

        // Check if image_id_front file was uploaded
        if (req.files && req.files.image_id_front) {
            frontImagePath = req.files.image_id_front[0].filename;
        }

        // Check if image_id_back file was uploaded
        if (req.files && req.files.image_id_back) {
            backImagePath = req.files.image_id_back[0].filename;
        }

        // Insert the tenant into the database
        const tenant = await Tenant.query().insert({
            business_name: req.body.business_name,
            unit: req.body.unit,
            full_name: req.body.full_name,
            address: req.body.address,
            email: req.body.email,
            contact_number: req.body.contact_number,
            lease_start: req.body.lease_start,
            lease_end: req.body.lease_end,
            signature: signaturePath,
            image_id_front: frontImagePath,
            image_id_back: backImagePath,
            status: req.body.status,
            created_at: new Date().toISOString(),
            modified: new Date().toISOString(),
        });

        req.flash('message', { text: 'Added new tenant', type: 'success' });
        res.redirect('/dashboard?view=tenant');
    } catch (error) {
        req.flash('message', { text: 'Error creating tenant:' + error, type: 'danger' });
        res.redirect('/dashboard?view=tenant');
    }
});

// Route handler for viewing tenant details
router.get("/dashboard/tenant", async (req, res) => {
    try {
        let mainUserData;

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

        const edit = req.query.edit;
        const view = req.query.view;
        const tenant_id = req.query.id;

        if (!tenant_id) {
            req.flash('message', { text: 'Tenant ID is required', type: 'danger' });
            return res.redirect('/dashboard?view=tenant');
        }

        const tenantData = await Tenant.query().where('tenant_id', tenant_id).first();

        if (!tenantData) {
            req.flash('message', { text: 'Tenant not found', type: 'danger' });
            return res.redirect('/dashboard?view=tenant');
        }

        res.render('pages/tenant_view', { tenantData: tenantData, view: view, mainUser: mainUserData, edit: edit });
    } catch (error) {
        console.error('Error fetching tenant data:', error);
        req.flash('message', { text: 'Error fetching tenant data: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=tenant');
    }
});

module.exports = router;
