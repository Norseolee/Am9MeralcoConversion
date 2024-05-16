// models/User.js

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
                    to: 'roles.role_id'
                }
            }
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password', 'role_id'],

            properties: {
                user_id: { type: 'integer' },
                role_id: { type: ['integer', 'null'] },
                username: { type: 'string', maxLength: 255 },
                password: { type: 'string', maxLength: 255 }
            }
        };
    }

    static async authenticate(username, password) {
        try {
            const user = await User.query().findOne({ username, password });
            return user ? user : null;
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }
}

module.exports = User;