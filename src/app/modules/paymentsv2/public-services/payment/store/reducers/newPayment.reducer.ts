import { createReducer, on } from '@ngrx/store';

import { ISuccessServicePayment } from '../../entities/new-payment';
import * as fromNewPayment from '../actions/newPayment.action';

export const initSavePayment: ISuccessServicePayment = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  specificErrorCode: null,
};

export const savePaymentReducer = createReducer(
  initSavePayment,
  on(fromNewPayment.CreatePaymentLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorCode: null,
    };
  }),
  on(fromNewPayment.CreatePaymentSuccess, (state, { data }) => {
    return {
      data,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(
    fromNewPayment.CreatePaymentFail,
    (state, { description, data, specificErrorCode }) => {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        data,
        specificErrorCode,
        errorMessage: description,
      };
    },
  ),
  on(fromNewPayment.CreatePaymentReset, (state) => {
    return initSavePayment;
  }),
);
