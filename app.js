require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const knex = require("./config/db");

const userRoutes = require("./config/Routes/userRoutes");
const mainRoutes = require("./config/Routes/mainRoutes");
const meralcoRoutes = require("./config/Routes/meralcoRoutes");
const tenantRoutes = require("./config/Routes/tenantRoutes");
const paymentRoutes = require("./config/Routes/paymentRoutes");
const migrationRoutes = require("./config/Routes/migrationRoutes");

const port = process.env.PORT || 3306;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

// Initialize flash after session
app.use(flash());

// Middleware to make flash messages available to all templates
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    next();
});

// Use routes for specific functionalities
app.use("/", meralcoRoutes);
app.use("/", tenantRoutes);
app.use("/", userRoutes);
app.use("/", mainRoutes);
app.use('/', migrationRoutes);
app.use('/', paymentRoutes);

app.get("/", (req, res) => {
    res.render("login", { message: res.locals.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
