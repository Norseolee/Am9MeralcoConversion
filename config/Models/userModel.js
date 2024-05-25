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
                password: { type: 'string', maxLength: 255 }
            }
        };
    }
}

module.exports = User;
