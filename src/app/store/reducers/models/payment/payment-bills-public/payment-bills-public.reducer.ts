import { PaymentBillResponseInterface } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromDestination from '../../../../actions/models/payment/payment-bills-public/payments-bills-public.action';

export interface PaymentBillState {
  bill: PaymentBillResponseInterface;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initPaymentBillUser: PaymentBillState = {
  bill: null,
  loading: false,
  loaded: false,
  error: false,
};

export function paymentBillReducer(
  state: PaymentBillState = initPaymentBillUser,
  action: fromDestination.actions,
): PaymentBillState {
  switch (action.type) {
    case fromDestination.PAYMENT_BILLS_PUBLIC_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case fromDestination.PAYMENT_BILLS_PUBLIC_SUCCESS:
      return {
        bill: (action as fromDestination.PaymentBillsPublicSuccessAction)
          .response,
        error: false,
        loading: false,
        loaded: true,
      };

    case fromDestination.PAYMENT_BILLS_PUBLIC_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
      };

    case fromDestination.PAYMENT_BILLS_PUBLIC_RESET:
      return initPaymentBillUser;

    default:
      return state;
  }
}
