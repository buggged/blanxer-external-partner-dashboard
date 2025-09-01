import { invert, invertBy } from 'lodash';

export const statusConstant = {
  transaction_status: {
    AWAITING_PAYMENT: 1,
    RECEIVED: 2,
    FAILED: 3,
    SETTLED: 4,
    REFUNDED: 5,
    ADMIN_PAID: 6,
    AWARDED: 99,
  },

  transaction_with: {
    BLANXER: 1,
    SELF: 2,
  },

  payment_methods: {
    NONE: 0,
    COD: 1,
    FONE_PAY: 2,
    CONNECT_IPS: 3,
    CARD: 4,
    ESEWA: 5,
    BANK_DEPOSIT: 6,
    KHALTI: 7,
    QR: 8,
    CASH: 9,
    NPX: 10,
    EARLY_ADOPTER_REWARD: 99,
  },

  coupan_type: {
    flat: 1,
    percent: 2,
    shipping: 3,
  },

  issue_priority: {
    HIGHEST: 1,
    HIGH: 2,
    NORMAL: 3,
    LOW: 4,
    LOWEST: 5,
  },

  issue_state: {
    CREATED: 1,
    IN_PROGRESS: 2,
    REVIEW: 3,
    RESOLVED: 4,
  },

  logistics: {
    NONE: -1,
    ARAMEX: 1,
    PATHAO: 2,
    NCM: 3,
    DASH: 4,
    UPAYA: 5,
    FABBUD: 6,
  },

  sms_events: {
    ORDER_RECEIVED: 1,
    ORDER_PROCESSING: 2,
    ORDER_DISPATCHED: 3,
    ORDER_DELIVERING_TODAY: 4,
    ORDER_DELIVERED: 5,
  },
};

export const statusConstantInverse = {
  transaction_status: invertBy(statusConstant.transaction_status),
  transaction_with: invertBy(statusConstant.transaction_with),
  payment_methods: invertBy(statusConstant.payment_methods),
  coupan_type: invertBy(statusConstant.coupan_type),
  //
  issue_state: invert(statusConstant.issue_state),
  issue_priority: invert(statusConstant.issue_priority),

  sms_events: invert(statusConstant.sms_events),
};
