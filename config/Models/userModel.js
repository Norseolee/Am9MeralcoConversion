const { Model } = require('objection');
const Role = require('./roleModel');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'users.role_id',
                    to: 'roles.id' 
                }
            }
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password', 'role_id'],
    
            properties: {
                id: { type: 'integer' },
                role_id: { type: ['integer', 'null'] },
                tenant_id: { type: ['integer', 'null'] }, 
                username: { type: 'string', maxLength: 255 },
                password: { type: 'string', maxLength: 255 },
                created_at: { type: 'string', format: 'date-time' },
                is_deleted: { type: 'integer', default: 0 },
                view_user: { type: 'integer', default: 0 },
                add_user: { type: 'integer', default: 0 },
                edit_user: { type: 'integer', default: 0 },
                delete_user: { type: 'integer', default: 0 },
                view_tenant: { type: 'integer', default: 0 },
                edit_tenant: { type: 'integer', default: 0 },
                delete_tenant: { type: 'integer', default: 0 },
                view_utility: { type: 'integer', default: 0 },
                add_utility: { type: 'integer', default: 0 },
                edit_utility: { type: 'integer', default: 0 },
                view_payment: { type: 'integer', default: 0 },
                add_payment: { type: 'integer', default: 0 },
            }
        };
    }
}

module.exports = User;
