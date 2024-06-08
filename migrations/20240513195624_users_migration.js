/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcrypt');

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
                table.boolean('is_deleted').defaultTo(false); 
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
