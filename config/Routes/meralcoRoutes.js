// meralcoRoutes.js
const express = require("express");
const router = express.Router();
const Meralco = require("../Models/meralcoModel");
const User = require("../Models/userModel");
const Tenant = require("../Models/tenantModel");
const { verifyToken } = require('../verifyToken');
const checkAdminStaff = require('../Middleware/audthStaffAdminMiddleware');


router.get('/dashboard/meralco/add-meralco', checkAdminStaff,  async (req, res) => {
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
  
      const today = new Date().toISOString().split('T')[0]; 
      const meralcoData = await Meralco.query().where('is_deleted', 0).orWhereNull('is_deleted');
      const todaysMeralcoData = await Meralco.query().where('created_at', today);
      const tenantData = await Tenant.query().where('is_deleted', 0);
  
      const userData = await User.query().where('is_deleted', 0);
  
      // Get the previous reading for each tenant
      const previousReadings = {};
      for (const tenant of tenantData) {
        const previousMeralcoRecord = await Meralco.query()
          .where('tenant_id', tenant.tenant_id)
          .orderBy('created_at', 'desc')
          .first();
  
        previousReadings[tenant.tenant_id] = previousMeralcoRecord ? previousMeralcoRecord.current_reading : null;
      }
  
      res.render('pages/add_meralco_billing', { 
        meralcoData, 
        todaysMeralcoData, 
        user: userData, 
        mainUser: mainUserData, 
        tenantData: tenantData,
        previousReadings: previousReadings
      });
    } catch (error) {
      req.flash('message', { text:  error.message, type: 'success' });
      res.redirect('/dashboard?view=meralco');
    }
  });
  
router.post('/dashboard/meralco_process/add-meralco', async (req, res) => {

      const formatDate = (date) => new Date(date).toISOString().split('T')[0];

        const parsedMeralcoData = {
            tenant_id: parseInt(req.body.tenant_id),
            per_kwh: parseFloat(req.body.per_kwh),
            due_date: req.body.due_date,
            date_of_reading: req.body.date_of_reading,
            previous_reading: parseFloat(req.body.previous_reading),
            current_reading: parseFloat(req.body.current_reading),
            consume: parseFloat(req.body.consume),
            total_amount: parseFloat(req.body.total_amount),
            created_at: formatDate( new Date()),
            is_deleted: false
        };
  
        console.log("Parsed Meralco Data:", parsedMeralcoData);
  
        try {
            const meralco = await Meralco.query().insert(parsedMeralcoData);
          
            req.flash('message', { text: 'Added Meralco Successfully', type: 'success' });
            res.redirect('/dashboard/meralco/add-meralco');
        } catch(error) {
            req.flash('message', { text: 'Error creating Meralco: ' + error.message, type: 'danger' });
            res.redirect('/dashboard/meralco/add-meralco');
        }
  })
  
router.get('/dashboard/meralco/previous-reading', async (req, res) => {
    try {
      const tenantId = req.query.tenant_id;
      // Get the current Meralco record for the tenant
      const currentMeralcoRecord = await Meralco.query()
        .where('tenant_id', tenantId)
        .andWhere('is_deleted', false)
        .orderBy('meralco_id', 'desc')
        .first();
      // Get the previous Meralco record for the tenant that is not the current record
      const previousMeralcoRecord = await Meralco.query()
        .where('meralco_id', currentMeralcoRecord.meralco_id) // Exclude the current record
        .andWhere('is_deleted', false)
        .orderBy('meralco_id', 'desc')
        .first();

      const previousReading = previousMeralcoRecord ? previousMeralcoRecord.current_reading : null;
      res.json({ previousReading });
    } catch (error) {
      console.error('Error fetching previous reading:', error);
      res.status(500).json({ error: 'Error fetching previous reading' });
    }
  });
  
router.get('/dashboard/meralco/print-meralco', checkAdminStaff, async (req, res) => {
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

        const today = new Date().toISOString().split('T')[0]; 
        
        // Other data fetches
        const todaysMeralcoData = await Meralco.query().where('created_at', today);
        const tenantData = await Tenant.query().where('is_deleted', 0);
        const userData = await User.query().where('is_deleted', 0);

        res.render('pages/meralco_print', {
            todayMeralcoData: todaysMeralcoData,
            user: userData,
            mainUser: mainUserData,
            tenantData: tenantData,
        });
    } catch (error) {
        req.flash('message', {
            text: error.message,
            type: 'success'
        });
        res.redirect('/dashboard?view=meralco');
    }
})
router.post('/meralco_process/meralco_edit', checkAdminStaff, async (req, res) => {
  try {
      let meralcoID = req.query.id;
      let { per_kwh, due_date, date_of_reading, previous_reading, current_reading, consume, total_amount } = req.body;

      // Convert numeric values to floats
      per_kwh = parseFloat(per_kwh);
      previous_reading = parseFloat(previous_reading);
      current_reading = parseFloat(current_reading);
      consume = parseFloat(consume);
      total_amount = parseFloat(total_amount);

      let updateFields = {
        per_kwh,
        due_date,
        date_of_reading,
        previous_reading,
        current_reading,
        consume,
        total_amount
      };

      const updatedMeralco = await Meralco.query().patchAndFetchById(meralcoID, updateFields);

      req.flash('message', { text: 'Meralco updated successfully', type: 'success' });
      res.redirect('/dashboard?view=meralco');
  } catch(error) {
    console.error(error);
    req.flash('message', { text: 'Internal Error', type: 'danger' });
    res.redirect('/dashboard?view=meralco');
  }
});




router.get('/get-meralco', checkAdminStaff, async (req, res) => {
  try {
      const tenantId = req.query.tenant_id;
      const meralcoData = await Meralco.query().where('tenant_id', tenantId);
      res.json(meralcoData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
router.get('/get-tenant-info', checkAdminStaff, async (req, res) => {
  try {
      const tenantId = req.query.tenant_id;
      const tenantInfo = await Tenant.query().findById(tenantId);
      res.json(tenantInfo);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
router.get('/get-billing-info', checkAdminStaff, async (req, res) => {
  try {
      const { tenant_id, meralco_id } = req.query;
      // Fetch billing information based on the selected tenantId and meralcoId
      const billingInfo = await Meralco.query().findOne({ tenant_id, meralco_id });
      res.json(billingInfo);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});




module.exports = router;