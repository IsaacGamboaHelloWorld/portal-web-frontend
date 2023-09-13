import { createReducer, on } from '@ngrx/store';
import { IDeleteLoanResponse } from '../../entities/financial-op';
import * as fromDelete from '../actions/delete-payment.action';

export interface IDeleteLoanPayments {
  deleteData: IDeleteLoanResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initDeleteLoanPayments: IDeleteLoanPayments = {
  deleteData: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const deleteLoanReducer = createReducer(
  initDeleteLoanPayments,
  on(fromDelete.DeleteLoanLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromDelete.DeleteLoanSuccess, (state, { deleteData }) => {
    return {
      deleteData,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromDelete.DeleteLoanFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
