const { Model } = require('objection');

class Role extends Model {
    static get tableName() {
        return 'roles'; // the table name is 'roles'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['roles_name', 'roles_no'],

            properties: {
                role_id: { type: 'integer' },
                roles_name: { type: 'string', maxLength: 255 },
                roles_no: { type: 'integer' }
            }
        };
    }
}
