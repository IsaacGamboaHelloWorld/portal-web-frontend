import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import * as fromPayment from '../../../../actions/models/payment/payment-account/payment-account-action';

export interface AccountPaymentState {
  loading: boolean;
  loaded: boolean;
  error: string;
  specificErrorCode: string;
  data: PaymentInterface;
}

export const initAccountPayment: AccountPaymentState = {
  loading: false,
  loaded: null,
  error: null,
  specificErrorCode: null,
  data: null,
};

export function accountPaymentReducer(
  state: AccountPaymentState = initAccountPayment,
  action: fromPayment.actions,
): AccountPaymentState {
  switch (action.type) {
    case fromPayment.PAYMENT_LOAD:
      return {
        ...state,
        loaded: null,
        error: null,
        specificErrorCode: null,
        loading: true,
      };

    case fromPayment.PAYMENT_SUCCESS:
      return {
        error: null,
        specificErrorCode: null,
        loading: false,
        data: (action as fromPayment.PaymentSuccessAction).payment,
        loaded: true,
      };

    case fromPayment.PAYMENT_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: (action as fromPayment.PaymentFailAction).type,
        specificErrorCode: (action as fromPayment.PaymentFailAction)
          .specificErrorCode,
      };

    case fromPayment.PAYMENT_RESET:
      return initAccountPayment;

    default:
      return state;
  }
}
