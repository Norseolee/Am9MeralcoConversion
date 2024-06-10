const { Model } = require('objection');

class Payment extends Model {
  static get tableName() {
    return 'payments';
  }
  static get idColumn() {
    return 'payment_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['payment_amount', 'total_amount', 'staff_id', 'mode_payment_id', 'utility_id', 'payment_type'],
      properties: {
        payment_id: { type: 'integer' },
        tenant_id: { type: 'integer' },
        payment_amount: { type: 'integer' },
        total_amount: { type: 'integer' },
        staff_id: { type: 'integer' },
        mode_payment_id: { type: 'integer' },
        utility_id: { type: 'integer' },
        payment_type: { type: 'string', enum: ['meralco', 'maynilad', 'rent'] },
        created_at: { type: 'string', format: 'date' },
      },
    };
  }

  static get relationMappings() {
    const Meralco = require('./meralcoModel');
    const Tenant = require('./tenantModel');
    const ModeofPayment = require('./modePaymentModel');

    return {
      meralco: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meralco,
        join: {
          from: 'payments.utility_id',
          to: 'meralco.meralco_id'
        }
      },
      tenant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tenant,
        join: {
          from: 'payments.tenant_id',
          to: 'tenants.tenant_id'
        }
      },
      modepayment: {
        relation: Model.BelongsToOneRelation,
        modelClass: ModeofPayment,
        join: {
          from: 'payments.mode_payment_id',
          to: 'mode_payments.mode_payment_id'
        }
      }
    };
  }
}

module.exports = Payment;
