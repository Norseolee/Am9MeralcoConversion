// const mysql = require("mysql");

// // mySQL;
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "Am9Commercial",
//   connectionLimit: 20,
// });

// // const pool = mysql.createPool({
// //     host: "b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com",
// //     user: "u1llarmjzoo3t683",
// //     password: "HKDuDLkfJO1cZQJX58M7",
// //     database: "b18rvltkeprxyrwdxj35",
// //     connectionLimit: 20,
// //   });


// module.exports = pool;

// config/db.js
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');

const knex = Knex(knexConfig.development);

// Bind all Models to the Knex instance
Model.knex(knex);

module.exports = knex;
