/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meralco', function(table) {
        table.increments('meralco_id').primary();
        table.integer('tenant_id').notNullable();
        table.integer('per_kwh').notNullable();
        table.string('due_date', 255).notNullable();
        table.string('date_of_reading').notNullable();
        table.integer('previous_reading').notNullable();
        table.integer('current_reading').notNullable();
        table.float('consume').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('meralco');
};
