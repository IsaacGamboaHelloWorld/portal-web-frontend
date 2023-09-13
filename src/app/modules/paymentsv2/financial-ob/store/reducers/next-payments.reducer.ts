import { createReducer, on } from '@ngrx/store';
import { IFinancialOp } from '../../entities/financial-op';
import * as fromNext from '../actions/next-payments.action';

export interface INextFinancialOpPayments {
  bills: IFinancialOp[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initNextFinancialOpPayments: INextFinancialOpPayments = {
  bills: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const nextFOPaymentsReducer = createReducer(
  initNextFinancialOpPayments,
  on(fromNext.NextFinancialOpPaymentsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromNext.NextFinancialOpPaymentsSuccess, (state, { billers }) => {
    return {
      bills: billers,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromNext.NextFinancialOpPaymentsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
