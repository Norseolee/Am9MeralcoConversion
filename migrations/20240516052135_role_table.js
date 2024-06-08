/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.increments('role_id').primary();
        table.string('roles_name', 255).notNullable();
    })
    .then(function () {
        return knex('roles').insert([
            { role_id: 1, roles_name: 'admin' },
            { role_id: 2, roles_name: 'staff' },
            { role_id: 3, roles_name: 'user' }
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};
