import { createReducer, on } from '@ngrx/store';

import { ISuccessFinancialOb } from '../../entities/new-payment';
import * as fromNewPayment from '../actions/newPayment.action';

export const initSavePayment: ISuccessFinancialOb = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const savePaymentReducer = createReducer(
  initSavePayment,
  on(fromNewPayment.CreateFOPaymentLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromNewPayment.CreateFOPaymentSuccess, (state, { data }) => {
    return {
      data,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromNewPayment.CreateFOPaymentFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
  on(fromNewPayment.CreateFOPaymentReset, (state) => {
    return initSavePayment;
  }),
);
