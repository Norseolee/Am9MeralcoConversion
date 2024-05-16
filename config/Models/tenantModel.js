// models/Tenant.js

const { Model } = require('objection');

class Tenant extends Model {
    static get tableName() {
        return 'tenants'; // table name is 'tenants'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'building'],

            properties: {
                tenant_id: { type: 'integer' },
                name: { type: 'string', maxLength: 255 },
                building: { type: 'string', maxLength: 255 },
                contact_number: { type: ['string', 'null'], maxLength: 12 }
            }
        };
    }
}

module.exports = Tenant;
