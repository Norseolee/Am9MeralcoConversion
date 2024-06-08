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
      connectionLimit: 5,
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
      host: 'dpg-cpi0prsf7o1s73ba9bi0-a',
      user: 'root',
      password: 'OBOW3zix2UcYdqt1U79cofZTBvuXHPoI',
      database: 'am9commercial',
      connectionLimit: 5,
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
      host: 'dpg-cpi0prsf7o1s73ba9bi0-a',
      user: 'root',
      password: 'OBOW3zix2UcYdqt1U79cofZTBvuXHPoI',
      database: 'am9commercial',
      connectionLimit: 5,
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
