/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcryptjs');

exports.up = function(knex) {
    // Hash the password asynchronously
    return bcrypt.hash('password123', 10) // Use your desired password here
        .then((hashedPassword) => {
            // Create the users table
            return knex.schema.createTable('users', function(table) {
                table.increments('id').primary();
                table.integer('role_id');
                table.integer('tenant_id').nullable();
                table.string('username', 255).notNullable().unique();
                table.string('password', 255).notNullable();
                table.date('created_at').nullable();
                table.integer('view_user').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('add_user').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('edit_user').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('delete_user').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('view_tenant').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('add_tenant').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('edit_tenant').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('delete_tenant').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('view_utility').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('add_utility').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('edit_utility').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('view_payment').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('add_payment').defaultTo(0); // tinyint(1) equivalent with default 0
                table.integer('is_deleted').defaultTo(0); 
            }).then(function() {
                // Insert a user with the hashed password
                return knex('users').insert([
                    { role_id: 1, username: 'admin', password: hashedPassword }
                ]);
            });
        });
};

exports.down = function(knex) {
    // Drop the users table
    return knex.schema.dropTableIfExists('users');
};
