import { createReducer, on } from '@ngrx/store';
import { IFinancialOp } from '../../entities/financial-op';
import * as fromAll from '../actions/registered-bills.action';

export interface IAllFinancialOpPayments {
  registeredLoans: IFinancialOp[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initAllFinancialOpPayments: IAllFinancialOpPayments = {
  registeredLoans: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const allFOPaymentsReducer = createReducer(
  initAllFinancialOpPayments,
  on(fromAll.AllFinancialOpPaymentsReset, (state) => {
    return initAllFinancialOpPayments;
  }),
  on(fromAll.AllFinancialOpPaymentsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAll.AllFinancialOpPaymentsSuccess, (state, { registeredLoans }) => {
    return {
      registeredLoans,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAll.AllFinancialOpPaymentsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
