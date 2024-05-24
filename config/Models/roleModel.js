const { Model } = require('objection');

class Role extends Model {
    static get tableName() {
        return 'roles'; // The table name is 'roles'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['roles_name'],

            properties: {
                role_id: { type: 'integer' },
                roles_name: { type: 'string', maxLength: 255 },
            }
        };
    }
}

module.exports = Role;
