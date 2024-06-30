const { Model } = require('objection');

class Tenant extends Model {
    static get tableName() {
        return 'tenants';
    }
    static get idColumn() {
        return 'tenant_id'; 
    }
    

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'business_name', 'unit', 'full_name', 'contact_number',
                'lease_start', 'lease_end', 'status', 'signature',
                'created_at', 'is_deleted', 'modified'
            ],
            properties: {
                tenant_id: { type: 'integer' },
                user_id: { type: ['integer', 'null'] },
                business_name: { type: 'string', maxLength: 200 },
                unit: { type: 'string', maxLength: 200 },
                full_name: { type: 'string', maxLength: 255 },
                email: { type: ['string', 'null'], maxLength: 255 },
                address: { type: ['string', 'null'], maxLength: 255 },
                contact_number: { type: ['string', 'null'], maxLength: 255 },
                lease_start: { type: ['string', 'null'], format: 'date' },
                lease_end: { type: ['string', 'null'], format: 'date' },
                status: { type: ['string', 'null'], maxLength: 255 },
                signature: { type: ['string', 'null'] },
                image_contract_01: { type: ['string', 'null'], maxLength: 255 },
                image_contract_02: { type: ['string', 'null'], maxLength: 255 },
                image_contract_03: { type: ['string', 'null'], maxLength: 255 },
                image_id_front: { type: ['string', 'null'], maxLength: 255 },
                image_id_back: { type: ['string', 'null'], maxLength: 255 },
                created_at: { type: 'string', format: 'date' },
                is_deleted: { type: 'integer', default: 0 },
                modified: { type: 'string', format: 'date' }
            }
        };
    }
}

module.exports = Tenant;
