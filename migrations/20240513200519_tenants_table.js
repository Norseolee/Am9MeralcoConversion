/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tenants', function(table) {
        table.increments('tenant_id').primary();
        table.string('name', 255).notNullable();
        table.string('building', 255).notNullable();
        table.string('contact_number', 12).nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('tenants');
    };
};
