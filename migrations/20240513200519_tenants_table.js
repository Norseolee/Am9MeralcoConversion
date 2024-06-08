/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tenants', function(table) {
        table.increments('tenant_id').primary();
        table.integer('user_id', 255).nullable();
        table.string('business_name', 200).notNullable();
        table.string('unit', 200).notNullable();
        table.string('full_name', 255).notNullable();
        table.string('email', 255).nullable();
        table.string('address', 255).nullable();
        table.string('contact_number', 255).notNullable();
        table.date('lease_start').nullable();
        table.date('lease_end').nullable();
        table.string('status', 255).nullable();
        table.longtext('signature').nullable();
        table.string('image_contract_01', 255).nullable();
        table.string('image_contract_02', 255).nullable();
        table.string('image_contract_03', 255).nullable();
        table.string('image_id_front', 255).nullable();
        table.string('image_id_back', 255).nullable();
        table.date('created_at').nullable();
        table.boolean('is_deleted').defaultTo(false); 
        table.date('modified').nullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tenants');
};
