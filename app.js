const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); // Import EJS
const knex = require("./config/db");

const userRoutes = require("./config/Routes/userRoutes");
const meralcoRoutes = require("./config/Routes/meralcoRoutes");
const tenantRoutes = require("./config/Routes/tenantRoutes");
const migrationRoutes = require("./config/Routes/migrationRoutes");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs"); // Set EJS as the view engine

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes for specific functionalities
app.use("/", meralcoRoutes);
app.use("/", tenantRoutes);
app.use("/", userRoutes);
app.use('/', migrationRoutes);

app.get("/", (req, res) => {
    res.render("index"); 
});


app.listen(port, () => console.log(`Listening on port ${port}`));
