import { createReducer, on } from '@ngrx/store';
import { IFinancialOp } from '../../entities/financial-op';
import * as fromActive from '../actions/select-payment.action';

export interface IActiveFinancialOpPaymentPayments {
  activePayment: IFinancialOp;
}

export const initActiveFinancialOpPaymentPayments: IActiveFinancialOpPaymentPayments = {
  activePayment: null,
};
export const activeFOPaymentReducer = createReducer(
  initActiveFinancialOpPaymentPayments,
  on(fromActive.SelectPaymentLoad, (state, { activePayment }) => {
    return {
      activePayment,
    };
  }),
  on(fromActive.SelectPaymentReset, (state) => {
    return initActiveFinancialOpPaymentPayments;
  }),
);
