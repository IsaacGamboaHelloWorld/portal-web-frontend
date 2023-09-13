import { createReducer, on } from '@ngrx/store';
import { IRecurringPaymentResponse } from '../../entities/public-services';
import * as fromRecurring from '../actions/delete-recurring-payment.action';

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

export const deleteRecurringPaymentReducer = createReducer(
  initRecurringPayment,
  on(fromRecurring.DeleteRecurringLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromRecurring.DeleteRecurringSuccessAction, (state, { recurring }) => {
    return {
      data: recurring,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromRecurring.DeleteRecurringFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromRecurring.DeleteRecurringResetAction, (state) => {
    return initRecurringPayment;
  }),
);
