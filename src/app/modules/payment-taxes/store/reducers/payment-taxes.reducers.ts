import { createReducer, on } from '@ngrx/store';

import { IAnswerPaymentTaxes } from '../../entities/payment-taxes';
import * as fromPaymentTaxes from '../actions/payment-taxes.actions';

export const initPaymentTaxes: IAnswerPaymentTaxes = {
  success: false,
  errorMessage: '',
  approvalId: '',
  specificErrorCode: '',
};

export const paymentTaxesReducer = createReducer(
  initPaymentTaxes,
  on(fromPaymentTaxes.PaymentTaxesLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      approvalId: '',
      specificErrorCode: '',
    };
  }),
  on(fromPaymentTaxes.PaymentTaxesSuccess, (state, { data }) => {
    return data;
  }),
  on(
    fromPaymentTaxes.PaymentTaxesFail,
    (state, { description, specificErrorCode }) => {
      return {
        success: false,
        errorMessage: description,
        approvalId: '',
        specificErrorCode,
      };
    },
  ),
  on(fromPaymentTaxes.PaymentTaxesReset, (state) => {
    return initPaymentTaxes;
  }),
);
