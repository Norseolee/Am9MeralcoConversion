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
      connectionLimit: 20,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com',
      user: 'u1llarmjzoo3t683',
      password: 'HKDuDLkfJO1cZQJX58M7',
      database: 'b18rvltkeprxyrwdxj35',
      connectionLimit: 20,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'b18rvltkeprxyrwdxj35-mysql.services.clever-cloud.com',
      user: 'u1llarmjzoo3t683',
      password: 'HKDuDLkfJO1cZQJX58M7',
      database: 'b18rvltkeprxyrwdxj35',
      connectionLimit: 20,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
