import { createReducer, on } from '@ngrx/store';
import { IRecurringPaymentResponse } from '../../entities/public-services';
import * as fromRecurring from '../actions/recurring-payment.action';

export interface IRecurringPaymentState {
  data: IRecurringPaymentResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initRecurringPayment: IRecurringPaymentState = {
  data: null,
  errorMessage: null,
  loading: false,
  loaded: false,
  error: false,
};

export const recurringPaymentReducer = createReducer(
  initRecurringPayment,
  on(fromRecurring.RecurringLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromRecurring.RecurringSuccessAction, (state, { recurring }) => {
    return {
      data: recurring,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromRecurring.RecurringFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromRecurring.RecurringResetAction, (state) => {
    return initRecurringPayment;
  }),
);
