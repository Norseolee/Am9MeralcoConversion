// tenantRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Define route handlers for tenant-related operations
router.get("/tenant_list", (req, res) => {
  pool.getConnection((err, connection) => {
      if (err) {
          console.error("Error getting connection from pool:", err);
          return res.status(500).send("Internal Server Error");
      }

      connection.query("SELECT * FROM tenants", (err, rows) => {
          connection.release(); // Release the connection back to the pool
          if (err) {
              console.error("Error executing query:", err);
              return res.status(500).send("Internal Server Error");
          }

          // Render tenant_list view with tenant data
          res.render("pages/tenant_list", { tenants: rows });
      });
  });
});
// get all the tenant_data
router.get("/tenant", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * FROM tenants", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});
  // get by the id
router.get("/tenant/:tenant_id", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      connection.query(
        "SELECT * FROM tenants WHERE tenant_id = ?",
        [req.params.tenant_id],
        (err, rows) => {
          connection.release(); // return the connection to pool
  
          if (!err) {
            res.send(rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  });
  
  //create a record tenant
router.post("/tenant/add-tenant", (req, res) => {
    pool.getConnection((getConnectionErr, connection) => {
      if (getConnectionErr) {
        console.error("Error getting connection from pool:", getConnectionErr);
        return res.status(500).send("Internal Server Error");
      }
  
      console.log(`Connected as id ${connection.threadId}`);
  
      const tenantParams = {
        name: req.body["name"],
        building: req.body["building"],
      };
  
      const meralcoParams = {
        date_of_reading: req.body["date_of_reading"],
        current_reading: req.body["current_reading"],
      };
  
      console.log("Tenant Params:", tenantParams);
      console.log("Meralco Params:", meralcoParams);
  
      connection.query(
        "INSERT INTO tenants SET ?",
        tenantParams,
        (tenantErr, tenantResult) => {
          if (tenantErr) {
            console.error("Error inserting tenant:", tenantErr);
            connection.release();
            return res.status(500).send("Error inserting tenant");
          }
  
          const newTenantId = tenantResult.insertId;
  
          meralcoParams.tenant_id = newTenantId;
  
          connection.query(
            "INSERT INTO meralco SET ?",
            meralcoParams,
            (meralcoErr) => {
              if (meralcoErr) {
                console.error("Error inserting Meralco:", meralcoErr);
                connection.release();
                return res.status(500).send("Error inserting Meralco");
              }
  
              connection.release();
              res.redirect("/");
            }
          );
        }
      );
    });
  });
  
  // update the record
router.put("/tenant/update-tenant/:tenant_id", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      console.log(`connected as id ${connection.threadId}`);
  
      const tenantId = req.params.tenant_id; // Keep the tenant_id constant
  
      const tenantParams = {
        name: req.body["name"],
        building: req.body["building"],
      };
  
      // Update tenant record
      connection.query(
        "UPDATE tenants SET name = ?, building = ? WHERE tenant_id = ?",
        [tenantParams.name, tenantParams.building, tenantId],
        (tenantErr, tenantResult) => {
          if (tenantErr) {
            console.error("Error updating tenant:", tenantErr);
            connection.release();
            return res.status(500).send("Error updating tenant");
          }
  
          connection.release();
          res.send(`Tenant with ID ${tenantId} has been updated`);
          res.redirect("/");
        }
      );
    });
  });

  // delete tenant record
router.delete("/tenant/delete/:tenant_id", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      const tenantId = req.params.tenant_id;
  
      connection.query(
        "DELETE FROM meralco WHERE tenant_id = ?",
        [tenantId],
        (meralcoErr) => {
          if (meralcoErr) {
            return connection.rollback(() => {
              connection.release();
              throw meralcoErr;
            });
          }
  
          connection.query(
            "DELETE FROM tenants WHERE tenant_id = ?",
            [tenantId],
            (tenantErr) => {
              if (tenantErr) {
                return connection.rollback(() => {
                  connection.release();
                  throw tenantErr;
                });
              }
  
              connection.release();
              res.send(`Tenant with the tenant ID ${tenantId} has been removed`);
            }
          );
        }
      );
    });
  });

// Export the router
module.exports = router;
