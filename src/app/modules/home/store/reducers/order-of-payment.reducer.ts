import { createReducer, on } from '@ngrx/store';

import { IOrderPaymentAll } from '../../entities/order-of-payment';
import * as fromOrderOfPayment from '../actions/order-of-payment.actions';

export const initAll: IOrderPaymentAll = {
  approvalId: '',
  errorMessage: '',
  specificErrorMessage: '',
  payrollLoans: [],
  success: false,
};

export const orderOfPaymentReducer = createReducer(
  initAll,
  on(fromOrderOfPayment.OrderOfPaymentLoad, (state) => {
    return {
      ...state,
      approvalId: '',
      errorMessage: '',
    };
  }),
  on(fromOrderOfPayment.OrderOfPaymentSuccess, (state, { data }) => {
    return {
      success: data.success,
      payrollLoans: data.payrollLoans,
    };
  }),
  on(fromOrderOfPayment.OrderOfPaymentFail, (state, { data }) => {
    return {
      success: false,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
    };
  }),
  on(fromOrderOfPayment.OrderOfPaymentReset, (state) => {
    return initAll;
  }),
);
