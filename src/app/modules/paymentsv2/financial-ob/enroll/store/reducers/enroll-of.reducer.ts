import { createReducer, on } from '@ngrx/store';
import { IFinancialObResponse } from '../../../entities/financial-op';
import * as fromPayment from '../actions/enroll-of.action';

export interface IFinancialObState {
  data: IFinancialObResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initFinancialObPayment: IFinancialObState = {
  data: null,
  errorMessage: null,
  loading: false,
  loaded: false,
  error: false,
};

export const financialObPaymentReducer = createReducer(
  initFinancialObPayment,
  on(fromPayment.EnrollOFLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromPayment.EnrollOFSuccessAction, (state, { response }) => {
    return {
      data: response,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromPayment.EnrollOFsFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromPayment.EnrollOFsResetAction, (state) => {
    return initFinancialObPayment;
  }),
);
