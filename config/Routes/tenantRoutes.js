// const express = require('express');
// const router = express.Router();
// const sharp = require('sharp');
// const Tenant = require('../Models/tenantModel');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, '../../public/uploads');
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
// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type. Only images are allowed.'));
//         }
//     }
// });

// router.post("/tenant_process/add-tenant", upload.single('signature'), async (req, res) => {
//     try {
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).send('No signature image uploaded.');
//         }

//         // // to save the file
//         // const signaturePath = req.file.path;


//         // Process the signature image to grayscale and resize
//         const processedImageBuffer = await sharp(req.file.path)
//         .greyscale() 
//         .threshold(100) 
//         .toFormat('jpeg', { quality: 100 })
//         .toBuffer();

//         // Define the path for the processed image
//         const processedImagePath = path.join(path.dirname(req.file.path), `processed-${req.file.filename}`);

//         // Save the processed image
//         fs.writeFileSync(processedImagePath, processedImageBuffer);

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
//             signature: processedImagePath,
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

// // Export the router
// module.exports = router;







// THIS IS FOR MULTIPLE FILES BUT IT SAVE ALL THE UNPROCESSED ONE AND THE PROCESSED TOO

// Configure multer for file upload

// const express = require('express');
// const router = express.Router();
// const sharp = require('sharp');
// const Tenant = require('../Models/tenantModel');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, '../../public/uploads');
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

// router.post("/tenant_process/add-tenant", upload.fields([
//     { name: 'signature', maxCount: 1 },
//     { name: 'image_id_front', maxCount: 1 },
//     { name: 'image_id_back', maxCount: 1 }
// ]), async (req, res) => {
//     try {
//         // Check if files were uploaded
//         if (!req.files || !req.files.signature || !req.files.image_id_front || !req.files.image_id_back) {
//             return res.status(400).send('Missing image uploads.');
//         }

//         // Process the signature image and get the file path
//         const signaturePath = await processImage(req.files.signature[0]);

//         // Get file paths for the unprocessed images
//         const frontImagePath = req.files.image_id_front[0].path;
//         const backImagePath = req.files.image_id_back[0].path;

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
//             image_id_front: frontImagePath,
//             image_id_back: backImagePath,
//             signature: signaturePath, // Use the file path here
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

// async function processImage(file) {
//     const processedImageBuffer = await sharp(file.path)
//         .greyscale()
//         .threshold(100)
//         .toFormat('jpeg', { quality: 100 })
//         .toBuffer();

//     // Define the path for the processed image
//     const processedImagePath = path.join(__dirname, '../../public/uploads', `processed-${Date.now()}-${file.originalname}`);

//     // Save the processed image
//     fs.writeFileSync(processedImagePath, processedImageBuffer);

//     return processedImagePath;
// }

// // Export the router
// module.exports = router;




// Configure multer for file upload










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
            // Do not save the original signature if not provided
            signature: signaturePath,
            // Set image_id_front and image_id_back to null if not provided
            image_id_front: frontImagePath,
            image_id_back: backImagePath,
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

// Export the router
module.exports = router;
