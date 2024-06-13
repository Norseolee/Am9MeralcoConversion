// paymentRoutes.js
const express = require("express");
const router = express.Router();
const Payment = require("../Models/PaymentModel");
const User = require('../Models/userModel');
const { randomBytes } = require('crypto');
const Meralco = require('../Models/meralcoModel');
const ModeOfPayment = require('../Models/modePaymentModel');
const Tenant = require('../Models/tenantModel'); // Assuming you have a Tenant model
const checkAdminStaff = require('../Middleware/audthStaffAdminMiddleware');

function generateTransactionNumber() {
    return randomBytes(4).toString('hex').toUpperCase();
}

function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

router.get('/dashboard/payment/add-payment', checkAdminStaff, async (req, res) => {
    try {

        mainUserData = req.session.user; 
        const payment = await Payment.query();
        const tenantData = await Tenant.query().where('is_deleted', 0);
        const modePayments = await ModeOfPayment.query();
        const latestMeralco = await Meralco.query().orderBy('created_at', 'desc').first();

        const paymentreceipt = await Payment.query()
            .withGraphFetched('[meralco, tenant, modepayment]')
            .modifyGraph('tenant', builder => {
                builder.select('*');
            })
            .modifyGraph('meralco', builder => {
                builder.select('*');
            })
            .modifyGraph('mode_payment_id', builder => {
                builder.select('*');
            });

            const resolvedPayments = paymentreceipt.map(payment => ({
                ...payment,
                created_at: formatDate(payment.created_at)
            }));

        res.render('pages/payment', {
            mainUser: mainUserData,
            tenantData,
            modePayments: modePayments,
            latestMeralco,
            payment,
            paymentreceipt: resolvedPayments,
        });
        
    } catch (error) {
        console.error('Error loading payment form:', error);
        req.flash('message', { text: 'Error loading payment form: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=payment');
    }
});

router.post('/payment_process/add-payment', checkAdminStaff, async (req, res) => {
    const { tenant_id, payment_amount, mode_payment_id, payment_type, latestUtilityBill, utility_id, total_amount } = req.body;

    if (!tenant_id || !payment_amount || !mode_payment_id || !payment_type) {
        req.flash('message', { text: 'All fields are required.', type: 'danger' });
        return res.redirect('/dashboard?view=payment');
    }

    try {
        const tenant = await Tenant.query().findById(tenant_id);
        if (!tenant) {
            req.flash('message', { text: 'Invalid tenant ID.', type: 'danger' });
            return res.redirect('/dashboard?view=payment');
        }

        // Fetch the utility bill details
        const utilityBill = await Meralco.query().findById(utility_id);
        if (!utilityBill) {
            req.flash('message', { text: 'Invalid utility ID.', type: 'danger' });
            return res.redirect('/dashboard?view=payment');
        }

        // Check if the utility bill is already fully paid
        if (utilityBill.is_paid) {
            req.flash('message', { text: 'The utility bill is already fully paid.', type: 'info' });
            return res.redirect('/dashboard?view=payment');
        }
        const formatDate = (date) => new Date(date).toISOString().split('T')[0];

        const transactionNumber = generateTransactionNumber();

        await Payment.query().insert({
            tenant_id: parseInt(tenant_id),
            payment_amount: parseFloat(payment_amount),
            total_amount: parseFloat(latestUtilityBill),
            staff_id: req.session.user.id,
            mode_payment_id: parseInt(mode_payment_id),
            utility_id: parseInt(utility_id),
            payment_type: payment_type,
            transaction_number: transactionNumber,
            created_at: formatDate(new Date()),
        });

        if (payment_type === 'meralco') {
            const updateFields = {
                current_total_amount: parseFloat(total_amount),
                is_paid: parseFloat(total_amount) === 0,
                paid_date: formatDate(new Date()),
            };

            await Meralco.query().patchAndFetchById(utility_id, updateFields);
        }

        req.flash('message', { text: 'Payment added successfully', type: 'success' });
        res.redirect('/dashboard?view=payment');
    } catch (error) {
        console.error('Error adding payment:', error);
        req.flash('message', { text: 'Error adding payment: ' + error.message, type: 'danger' });
        res.redirect('/dashboard?view=payment');
    }
});


router.get('/payment_process/total_amount', async (req, res) => {
    try {
        const tenantId = req.query.tenant_id;
        const payment_type = req.query.payment_type;
        let Utility = '';

        if (payment_type == 'meralco') {
            // Get the current Meralco record for the tenant
            Utility = await Meralco.query()
                .where('tenant_id', tenantId)
                .andWhere('is_deleted', false)
                .orderBy('meralco_id', 'desc')
                .first();
        } else if (payment_type == 'maynilad') {
            // later
        } else if (payment_type == 'rent') {
            // later
        }

        const totalAmountBilling = Utility ? Utility : null;
        res.json({ totalAmountBilling });
    } catch (error) {
        console.error('Error fetching previous reading:', error);
        res.status(500).json({ error: 'Error fetching previous reading' });
    }
});

  

module.exports = router;
