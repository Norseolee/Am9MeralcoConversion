const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('../verifyToken');

const Tenant = require('../Models/tenantModel');
const User = require('../Models/userModel');
const permission = require('../Middleware/checkPermission');

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

// Middleware to create uploads directory if it doesn't exist
const createUploadDir = (req, res, next) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Uploads directory created successfully.');
    }
    next();
};

router.use(createUploadDir);

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

async function processImage(file) {
    const processedImageBuffer = await sharp(file.path)
        .greyscale()
        .threshold(100)
        .toFormat('jpeg', { quality: 100 })
        .toBuffer();

    const processedImagePath = path.join(__dirname, '../../public/uploads', `processed-${Date.now()}-${file.originalname}`);
    const filename = `processed-${Date.now()}-${file.originalname}`;

    fs.writeFileSync(processedImagePath, processedImageBuffer);

    return filename;
}

// Route handler for viewing tenant details
router.get("/dashboard/tenant", async (req, res) => {
    try {
        let mainUserData;

        if (req.session.user) {
            mainUserData = await User.query().findById(req.session.user.id);
        } else if (req.cookies.remember_token) {
            const user = await verifyToken(req.cookies.remember_token);
            if (user) {
                req.session.user = user;
                mainUserData = await User.query().findById(user.id);
            } else {
                return res.redirect('/');
            }
        } else {
            return res.redirect('/');
        }

        const { edit, view, id: tenant_id } = req.query;

        if (!tenant_id) {
            req.flash('message', { text: 'Tenant ID is required', type: 'danger' });
            return res.redirect('/dashboard?view=tenant');
        }

        const tenantData = await Tenant.query().where('tenant_id', tenant_id).first();

        if (!tenantData) {
            req.flash('message', { text: 'Tenant not found', type: 'danger' });
            return res.redirect('/dashboard?view=tenant');
        }

        res.render('pages/tenant_view', { tenantData, view, mainUser: mainUserData, edit });
    } catch (error) {
        console.error('Error fetching tenant data:', error);
        req.flash('message', { text: 'Error fetching tenant data: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=tenant');
    }
});

// Route handler for add tenant
router.post("/tenant_process/add-tenant", permission('add_tenant') , upload.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'image_id_front', maxCount: 1 },
    { name: 'image_id_back', maxCount: 1 }
]), async (req, res) => {
    try {
        let signaturePath = null;
        let frontImagePath = null;
        let backImagePath = null;

        if (req.files && req.files.signature) {
            signaturePath = await processImage(req.files.signature[0]);
        }

        if (req.files && req.files.image_id_front) {
            frontImagePath = req.files.image_id_front[0].filename;
        }

        if (req.files && req.files.image_id_back) {
            backImagePath = req.files.image_id_back[0].filename;
        }

        const formatDate = (date) => new Date(date).toISOString().split('T')[0];

        const tenant = await Tenant.query().insert({
            business_name: req.body.business_name,
            unit: req.body.unit,
            full_name: req.body.full_name,
            address: req.body.address,
            email: req.body.email,
            contact_number: req.body.contact_number,
            lease_start: formatDate(req.body.lease_start),
            lease_end: formatDate(req.body.lease_end),
            signature: signaturePath,
            image_id_front: frontImagePath,
            image_id_back: backImagePath,
            status: req.body.status,
            created_at: formatDate(new Date()),
            modified: formatDate(new Date()),
        });

        req.flash('message', { text: 'Added new tenant', type: 'success' });
        res.redirect('/dashboard?view=tenant');
    } catch (error) {
        req.flash('message', { text: 'Error creating tenant: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=tenant');
    }
});

// Route handler for editing tenant
router.post("/tenant_process/edit-tenant", permission('edit_tenant') , upload.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'image_id_front', maxCount: 1 },
    { name: 'image_id_back', maxCount: 1 }
]), async (req, res) => {
    let tenantID; 

    try {
        let signaturePath = null;
        let frontImagePath = null;
        let backImagePath = null;

        tenantID = req.query.id;  // Assign tenantID here

        if (req.files && req.files.signature) {
            signaturePath = await processImage(req.files.signature[0]);
        }

        if (req.files && req.files.image_id_front) {
            frontImagePath = req.files.image_id_front[0].filename;
        }

        if (req.files && req.files.image_id_back) {
            backImagePath = req.files.image_id_back[0].filename;
        }

        let leaseStart = null;
        let leaseEnd = null;

        // Check if lease_start is provided and not empty
        if (req.body.lease_start && req.body.lease_start.trim() !== '') {
            leaseStart = new Date(req.body.lease_start).toISOString().split('T')[0];
        }

        // Check if lease_end is provided and not empty
        if (req.body.lease_end && req.body.lease_end.trim() !== '') {
            leaseEnd = new Date(req.body.lease_end).toISOString().split('T')[0];
        }

        const formatDate = (date) => new Date(date).toISOString().split('T')[0];

        const updateFields = {
            business_name: req.body.business_name,
            unit: req.body.unit,
            full_name: req.body.full_name,
            address: req.body.address,
            email: req.body.email,
            contact_number: req.body.contact_number,
            lease_start: leaseStart,
            lease_end: leaseEnd,
            status: req.body.status,
            modified: formatDate(new Date()),
        };

        if (signaturePath) updateFields.signature = signaturePath;
        if (frontImagePath) updateFields.image_id_front = frontImagePath;
        if (backImagePath) updateFields.image_id_back = backImagePath;

        const updatedTenant = await Tenant.query().patchAndFetchById(tenantID, updateFields);

        req.flash('message', { text: 'Tenant updated successfully', type: 'success' });
        res.redirect(`/dashboard/tenant?view=tenant_view&id=${tenantID}`);
    } catch (error) {
        req.flash('message', { text: 'Error updating tenant: ' + error.message, type: 'danger' });
        res.redirect(`/dashboard/tenant?view=tenant_view&id=${tenantID}`);
    }
});

router.get('/tenant_process/delete-tenant', permission('delete_tenant') , async (req, res) => {
    try {
        // Check if 'do' parameter is provided and equals 'delete'
        if (req.query.do === 'delete') {
            // Check if 'id' parameter is provided
            if (!req.query.id) {
                req.flash('message', { text: 'Tenant ID is required', type: 'danger' });
                return res.redirect('/dashboard?view=tenant');
            }

            const tenantID = req.query.id;

            // Update the tenant to set is_deleted to 1
            await Tenant.query().findById(tenantID).patch({ is_deleted: 1 });

            // Redirect back to the dashboard or any other appropriate page
            req.flash('message', { text: 'Tenant marked as deleted successfully', type: 'success' });
            res.redirect('/dashboard?view=tenant');
        } else {
            req.flash('message', { text: 'Invalid action', type: 'danger' });
            res.redirect('/dashboard?view=tenant');
        }
    } catch (error) {
        console.error('Error marking tenant as deleted:', error);
        req.flash('message', { text: 'Error marking tenant as deleted: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=tenant');
    }
});


module.exports = router;
