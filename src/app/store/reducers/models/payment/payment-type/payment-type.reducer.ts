import * as fromPaymentType from '../../../../actions/models/payment/payment-type/payment-type.action';

export interface PaymentTypeState {
  loading: boolean;
  loaded: boolean;
  error: string;
  data: string;
}

export const initPaymentType: PaymentTypeState = {
  loading: false,
  loaded: null,
  error: null,
  data: null,
};

export function paymentTypeReducer(
  state: PaymentTypeState = initPaymentType,
  action: fromPaymentType.actions,
): PaymentTypeState {
  switch (action.type) {
    case fromPaymentType.PAYMENT_TYPE_SET:
      return {
        error: null,
        loading: false,
        data: (action as fromPaymentType.PaymentTypeSetAction).paymentType,
        loaded: true,
      };
    default:
      return state;
  }
}
