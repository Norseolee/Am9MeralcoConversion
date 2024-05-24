/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.integer('role_id');
        table.string('username', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamps(true, true);
    }).then(function() {
        return knex('users').insert([
            { role_id: 1, username: 'admin', password: 'Gabuya_Am9'}
        ]);
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};