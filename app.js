const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// NySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Am9Commercial",
  connectionLimit: 20,
});

// get all the tenant_data
app.get("/tenant_database", (req, res) => {
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
app.get("/meralco_history", (req, res) => {
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
app.get("/:tenant_id", (req, res) => {
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
app.delete("/:tenant_id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "DELETE FROM tenants WHERE tenant_id = ?",
      [req.params.tenant_id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(
            `Tenant with the tenant ID${[req.params.tenant_id]} has been remove`
          );
        } else {
          console.log(err);
        }
      }
    );
  });
});

//create a record
app.post("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const params = req.body;

    connection.query("INSERT INTO tenants SET ?", params, (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(`Tenant with the ${params.name} has been added`);
      } else {
        console.log(err);
      }
    });

    console.log(req.body);
  });
});

// update the record
app.put("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const { tenant_id, name, building } = req.body;

    connection.query(
      "UPDATE tenants SET name = ?, building = ? WHERE tenant_id = ?",
      [name, building, tenant_id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(`Tenant with the ${name} has been updated`);
        } else {
          console.log(err);
        }
      }
    );

    console.log(req.body);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
