// tenantRoutes.js

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

const upload = multer({ storage: storage });

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
            frontImagePath = req.files.image_id_front[0].path;
        }

        // Check if image_id_back file was uploaded
        if (req.files && req.files.image_id_back) {
            backImagePath = req.files.image_id_back[0].path;
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

async function processImage(file) {
    const processedImageBuffer = await sharp(file.path)
        .greyscale()
        .threshold(100)
        .toFormat('jpeg', { quality: 100 })
        .toBuffer();

    // Define the path for the processed image
    const processedImagePath = path.join(__dirname, '../../public/uploads', `processed-${Date.now()}-${file.originalname}`);

    // Save the processed image
    fs.writeFileSync(processedImagePath, processedImageBuffer);

    return processedImagePath;
}

module.exports = router;
