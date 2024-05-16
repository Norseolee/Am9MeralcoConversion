// meralcoRoutes.js
const express = require("express");
const router = express.Router();
const Meralco = require("../models/meralcoModel");

// view the meralco
router.get('/pages/meralco_billing', async (req, res) => {
  const meralcoRecords = await Meralco.query();
  res.render('pages/meralco_billing', { records: meralcoRecords });
})
// create a record meralco
router.post("/meralco/add-meralco", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      console.log(`Connected as id ${connection.threadId}`);
  
      const meralcoParams = {
        tenant_id: req.body["updateTenantId"],
        due_date: req.body["updateDueDate"],
        per_kwh: req.body["updatePerKwh"],
        date_of_reading: req.body["updateDateOfReading"],
        previous_reading: req.body["updatePreviousReading"],
        current_reading: req.body["updateCurrentReading"],
        consume: req.body["updateConsume"],
      };
  
      connection.query(
        "INSERT INTO meralco  SET ? ",
        [meralcoParams],
        (meralcoErr, meralcoResult) => {
          if (meralcoErr) {
            console.error("Error inserting Meralco record:", meralcoErr);
            connection.release();
            return res.status(500).send("Error inserting Meralco record");
          }
  
          connection.release();
          res.redirect("/");
        }
      );
    });
  });
  
  //get all the meralco history
  router.get("/meralco", async (req, res) => {
    try {
      const meralcoRecords = await Meralco.query();
      res.json(meralcoRecords);
    } catch (error) {
      console.error('Error retrieving meralco records:', error);
      res.status(500).send('Error retrieving meralco records')
    }
    // pool.getConnection((err, connection) => {
    //   if (err) throw err;
    //   console.log(`coneected as id ${connection.threadId}`);
  
    //   connection.query("SELECT * FROM meralco", (err, rows) => {
    //     connection.release(); // return the connection to pool
  
    //     if (!err) {
    //       res.send(rows);
    //     } else {
    //       console.log(err);
    //     }
    //   });
    // });
  });
  
  // delete meralco record
  router.delete("/meralco/delete/:meralco_id", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      const meralcoId = req.params.meralco_id;
  
      connection.query(
        "DELETE FROM meralco WHERE meralco_id = ?",
        [meralcoId],
        (meralcoErr) => {
          if (meralcoErr) {
            return connection.rollback(() => {
              connection.release();
              throw meralcoErr;
            });
          }
  
          connection.release();
          res.send(`Tenant with the meralco ID ${meralcoId} has been removed`);
        }
      );
    });
  });

// Export the router
module.exports = router;
