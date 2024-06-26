/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('payments', function(table) {
      table.increments('payment_id', 20).primary();
      table.integer('tenant_id').notNullable();
      table.integer('payment_amount', 10, 2).notNullable();
      table.integer('total_amount', 10, 2).notNullable();
      table.integer('staff_id').notNullable();
      table.integer('mode_payment_id').unsigned().notNullable();
      table.integer('utility_id').notNullable();
      table.enu('payment_type', ['meralco', 'maynilad', 'rent']).notNullable();
      table.string('transaction_number').notNullable();
      table.date('created_at').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('payments');
  };
  