const { Model } = require('objection');

class Payment extends Model {
  static get tableName() {
    return 'payments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['payment_amount', 'total_amount', 'staff_id', 'mode_payment_id', 'utility_id', 'payment_type'],
      properties: {
        payment_id: { type: 'integer' },
        payment_amount: { type: 'integer' },
        total_amount: { type: 'integer' },
        staff_id: { type: 'integer' },
        mode_payment_id: { type: 'integer' },
        utility_id: { type: 'integer' },
        payment_type: { type: 'string', enum: ['meralco', 'maynilad', 'rent'] },
      },
    };
  }

  static get relationMappings() {
    return {
      mode_payment: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ModePayment,
        join: {
          from: 'payments.mode_payment_id',
          to: 'mode_payments.mode_payment_id',
        },
      },
    };
  }
}

module.exports = Payment;
