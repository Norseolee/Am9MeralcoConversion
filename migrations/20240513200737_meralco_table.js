/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meralco', function(table) {
        table.increments('meralco_id').primary();
        table.integer('tenant_id').notNullable();
        table.integer('per_kwh').notNullable();
        table.string('due_date', 100).notNullable();
        table.string('date_of_reading', 100).nullable();
        table.decimal('previous_reading', 10, 1).notNullable();
        table.decimal('current_reading', 10, 1).notNullable();
        table.decimal('consume', 10, 1).notNullable();
        table.boolean('is_paid').nullable();
        table.date('paid_date').nullable();
        table.datetime('created').nullable();
        table.boolean('is_deleted').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('meralco');
};
