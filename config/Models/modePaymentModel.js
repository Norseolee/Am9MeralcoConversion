const { Model } = require('objection');


class ModePayment extends Model {
    static get tableName() {
        return 'mode_payments'; 
    }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        mode_payment_id: { type: 'integer' },
        type: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = ModePayment;
