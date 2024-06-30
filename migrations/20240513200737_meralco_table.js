/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meralco', function(table) {
        table.increments('meralco_id').primary();
        table.integer('tenant_id').notNullable();
        table.decimal('per_kwh', 10, 1).defaultTo(0.0);;
        table.string('due_date', 100).nullable();
        table.string('date_of_reading', 100).nullable();
        table.decimal('previous_reading', 10, 1).nullable();
        table.decimal('current_reading', 10, 1).notNullable();
        table.decimal('consume', 10, 1).notNullable();
        table.boolean('is_paid').nullable();
        table.date('paid_date').nullable();
        table.float('total_amount', 10, 2).notNullable();
        table.float('current_total_amount', 10, 2).notNullable();
        table.date('created_at').nullable();
        table.integer('is_deleted').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('meralco');
};
