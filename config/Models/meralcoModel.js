// models/Meralco.js

const { Model } = require('objection');

class Meralco extends Model {
    static get tableName() {
        return 'meralco'; // the table name is 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['tenant_id', 'per_kwh', 'due_date', 'date_of_reading', 'previous_reading', 'current_reading', 'consume'],

            properties: {
                meralco_id: { type: 'integer' },
                tenant_id: { type: 'integer' },
                per_kwh: { type: 'integer' },
                due_date: { type: 'string', maxLength: 255 },
                date_of_reading: { type: 'string' },
                previous_reading: { type: 'integer' },
                current_reading: { type: 'integer' },
                consume: { type: 'number' }
            }
        };
    }
}

module.exports = Meralco;
