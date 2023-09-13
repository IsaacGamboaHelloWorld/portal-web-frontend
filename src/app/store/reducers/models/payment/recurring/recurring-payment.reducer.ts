import { createReducer, on } from '@ngrx/store';
import { IRecurringPaymentResponse } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromRecurring from '../../../../actions/models/payment/recurring/recurring-payment.action';

export interface RecurringPaymentState {
  data: IRecurringPaymentResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initRecurringPayment: RecurringPaymentState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const recurringPaymentReducer = createReducer(
  initRecurringPayment,
  on(fromRecurring.RecurringPaymentLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromRecurring.RecurringPaymentSuccessAction, (state, { recurring }) => {
    return {
      data: recurring,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromRecurring.RecurringPaymentFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromRecurring.RecurringPaymentResetAction, (state) => {
    return initRecurringPayment;
  }),
);
