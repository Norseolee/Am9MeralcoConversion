const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const Tenant = require('../Models/tenantModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads');
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
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    }
});

router.post("/tenant_process/add-tenant", upload.single('signature'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).send('No signature image uploaded.');
        }

        // Process the signature image to grayscale and resize
        const processedImageBuffer = await sharp(req.file.path)
            .resize(200, 200)
            .grayscale()
            .toBuffer();

        // Define the path for the processed image
        const processedImagePath = path.join(path.dirname(req.file.path), `processed-${req.file.filename}`);

        // Save the processed image
        fs.writeFileSync(processedImagePath, processedImageBuffer);

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
            signature: processedImagePath,
            status: req.body.status,
            created_at: new Date().toISOString(),
            modified: new Date().toISOString(),
        });

        res.redirect('/dashboard?view=tenant');
    } catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router
module.exports = router;


// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, '../public/uploads');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//             console.log('Uploads directory created successfully.');
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
// const upload = multer({ storage: storage });

// // Route handler for adding a new tenant
// router.post("/tenant_process/add-tenant", upload.single('signature'), async (req, res) => {
//     try {
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).send('No signature image uploaded.');
//         }

//         // console.log('Uploaded File:', req.file);
//         // console.log('Directory Exists:', fs.existsSync(path.join(__dirname, '../public/uploads')));
//         // console.log('Directory Permissions:', fs.statSync(path.join(__dirname, '../public/uploads')));

//         // Process the signature image
//         const signaturePath = req.file.path;

//         // Insert the tenant into the database
//         const tenant = await Tenant.query().insert({
//             business_name: req.body.business_name,
//             unit: req.body.unit,
//             full_name: req.body.full_name,
//             address: req.body.address,
//             email: req.body.email,
//             contact_number: req.body.contact_number,
//             lease_start: req.body.lease_start,
//             lease_end: req.body.lease_end,
//             signature: signaturePath,
//             status: req.body.status,
//             created_at: new Date().toISOString(),
//             modified: new Date().toISOString(),
//         });

//         res.redirect('/dashboard?view=tenant');
//     } catch (error) {
//         console.error('Error creating tenant:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// Export the router
module.exports = router;
