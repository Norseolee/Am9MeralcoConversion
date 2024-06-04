const { Model } = require('objection');

class Meralco extends Model {
    static get tableName() {
        return 'meralco';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['tenant_id', 'per_kwh', 'due_date', 'previous_reading', 'current_reading', 'consume', 'is_paid', 'paid_date', 'created', 'is_deleted'],

            properties: {
                meralco_id: { type: 'integer' },
                tenant_id: { type: 'integer' },
                per_kwh: { type: ['integer', 'null'] },
                due_date: { type: 'string', maxLength: 100 },
                date_of_reading: { type: ['string', 'null'], maxLength: 100 },
                previous_reading: { type: 'number', precision: 10, scale: 1 },
                current_reading: { type: 'number', precision: 10, scale: 1 },
                consume: { type: 'number', precision: 10, scale: 1 },
                is_paid: { type: 'boolean', nullable: true }, 
                paid_date: { type: ['string', 'null'], format: 'date' },
                total_amount: { type: 'number' },
                current_total_amount: { type: 'number' },
                created: { type: ['string', 'null'], format: 'date-time' },
                is_deleted: { type: 'boolean' }
            }
        };
    }
}

module.exports = Meralco;
