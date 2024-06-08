/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'am9commercial',
<<<<<<< HEAD
      connectionLimit: 5,
=======
      connectionLimit: 20,
>>>>>>> parent of b2b0a0b (added port from 3000 to 3306)
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
<<<<<<< HEAD
      host: 'dpg-cpi0prsf7o1s73ba9bi0-a',
      user: 'root',
      password: 'OBOW3zix2UcYdqt1U79cofZTBvuXHPoI',
      database: 'am9commercial',
      connectionLimit: 5,
=======
      host: 'b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com',
      user: 'u1llarmjzoo3t683',
      password: 'HKDuDLkfJO1cZQJX58M7',
      database: 'b18rvltkeprxyrwdxj35',
      connectionLimit: 20,
>>>>>>> parent of b2b0a0b (added port from 3000 to 3306)
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
<<<<<<< HEAD
      host: 'dpg-cpi0prsf7o1s73ba9bi0-a',
      user: 'root',
      password: 'OBOW3zix2UcYdqt1U79cofZTBvuXHPoI',
      database: 'am9commercial',
      connectionLimit: 5,
=======
      host: 'b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com',
      user: 'u1llarmjzoo3t683',
      password: 'HKDuDLkfJO1cZQJX58M7',
      database: 'b18rvltkeprxyrwdxj35',
      connectionLimit: 20,
>>>>>>> parent of b2b0a0b (added port from 3000 to 3306)
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
