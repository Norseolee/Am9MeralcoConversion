const { Model } = require('objection');

class Meralco extends Model {
    static get tableName() {
        return 'meralco';
    }
    static get idColumn() {
        return 'meralco_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['tenant_id', 'per_kwh', 'due_date', 'previous_reading', 'current_reading', 'consume', 'is_paid', 'created_at', 'is_deleted'],

            properties: {
                meralco_id: { type: 'integer' },
                tenant_id: { type: 'integer' },
                per_kwh: { type: ['number', 'null'] },
                due_date: { type: 'string', maxLength: 100 },
                date_of_reading: { type: ['string', 'null'], maxLength: 100 },
                previous_reading: { type: ['number', 'null'] },
                current_reading: { type: 'number' },
                consume: { type: 'number' },
                is_paid: { type: 'boolean', default: false }, 
                paid_date: { type: ['string', 'null'], format: 'date' },
                total_amount: { type: 'number' },
                current_total_amount: { type: 'number' },
                created_at: { type: ['string', 'null'], format: 'date' },
                is_deleted: { type: 'integer', default: 0 },
            }
        };
    }
}

module.exports = Meralco;
