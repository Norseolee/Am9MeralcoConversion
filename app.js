const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const port = process.env.PORT || 3000; // this is our port
const app = express(); // this is our app or instance of express
app.use(express.static("public")); // this to serve our public folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mySQL;
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Am9Commercial",
  connectionLimit: 20,
});
// const pool = mysql.createPool({
//   host: "b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com",
//   user: "u1llarmjzoo3t683",
//   password: "HKDuDLkfJO1cZQJX58M7",
//   database: "b18rvltkeprxyrwdxj35",
//   connectionLimit: 20,
// });

// get all the tenant_data
app.get("/tenant", (req, res) => {
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

//get all the meralco history
app.get("/meralco", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`coneected as id ${connection.threadId}`);

    connection.query("SELECT * FROM meralco", (err, rows) => {
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
app.get("/tenant/:tenant_id", (req, res) => {
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

// delete a record
app.delete("/tenant/delete/:tenant_id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const tenantId = req.params.tenant_id;

    connection.query(
      "DELETE FROM Meralco WHERE tenant_id = ?",
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

//create a record tenant
app.post("/tenant/add-tenant", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log(`Connected as id ${connection.threadId}`);

    const tenantId = req.params.tenant_id;

    const tenantParams = {
      name: req.body["name"],
      building: req.body["building"],
    };

    const meralcoParams = {
      date_of_reading: req.body["date_of_reading"],
      current_reading: req.body["current_reading"],
    };

    connection.query(
      "INSERT INTO tenants SET ?",
      tenantParams,
      (tenantErr, tenantResult) => {
        if (tenantErr) {
          return connection.rollback(() => {
            console.error("Error inserting tenant:", tenantErr);
            connection.release();
            res.status(500).send("Error inserting tenant");
          });
        }

        const newTenantId = tenantResult.insertId;

        meralcoParams.tenant_id = newTenantId;

        connection.query(
          "INSERT INTO Meralco SET ?",
          meralcoParams,
          (meralcoErr) => {
            if (meralcoErr) {
              return connection.rollback(() => {
                console.error("Error inserting Meralco:", meralcoErr);
                connection.release();
                res.status(500).send("Error inserting Meralco");
              });
            }

            connection.release();
            res.redirect("/");
          }
        );
      }
    );
  });
});

// create a record meralco
app.post("/meralco/add-meralco", (req, res) => {
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
          return connection.rollback(() => {
            console.error("Error inserting Meralco record:", meralcoErr);
            connection.release();
            res.status(500).send("Error inserting Meralco record");
          });
        }

        connection.release();
        res.redirect("/");
      }
    );
  });
});

// update the record
app.put("/tenant/update-tenant/:tenant_id", (req, res) => {
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

    const meralcoParams = {
      date_of_reading: req.body["date_of_reading"],
      current_reading: req.body["current_reading"],
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

        // Update Meralco record for the same tenant
        connection.query(
          "UPDATE Meralco SET date_of_reading = ?, current_reading = ? WHERE tenant_id = ?",
          [
            meralcoParams.date_of_reading,
            meralcoParams.current_reading,
            tenantId,
          ],
          (meralcoErr, meralcoResult) => {
            if (meralcoErr) {
              return connection.rollback(() => {
                console.error("Error updating Meralco:", meralcoErr);
                connection.release();
                res.status(500).send("Error updating Meralco");
              });
            }

            connection.release();
            res.send(`Tenant with ID ${tenantId} has been updated`);
          }
        );
      }
    );
  });
});

//

//

//

//

//

app.listen(port, () => console.log(`listening on port ${port}`));
