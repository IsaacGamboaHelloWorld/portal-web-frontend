import { createReducer, on } from '@ngrx/store';
import { IDeleteServiceResponse } from '../../entities/public-services';
import * as fromDelete from '../actions/delete-payment.action';

export interface IDeletePublicServicePayments {
  deleteData: IDeleteServiceResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initDeletePublicServicePayments: IDeletePublicServicePayments = {
  deleteData: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const deletePaymentReducer = createReducer(
  initDeletePublicServicePayments,
  on(fromDelete.DeletePaymentPublicLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromDelete.DeletePaymentPublicSuccess, (state, { deleteData }) => {
    return {
      deleteData,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromDelete.DeletePaymentPublicFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
