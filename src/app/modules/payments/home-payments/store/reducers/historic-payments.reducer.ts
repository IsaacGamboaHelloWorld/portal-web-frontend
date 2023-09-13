import { Record } from '@modules/payments/home-payments/entities/historic-payments';
import { createReducer, on } from '@ngrx/store';
import * as fromHistoric from '../actions/historic-payments.action';

export interface IHistoricPayments {
  data: Record[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initHistoricPayments: IHistoricPayments = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const historyTransferReducer = createReducer(
  initHistoricPayments,
  on(fromHistoric.HistoricPaymentsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromHistoric.HistoricPaymentsSuccess, (state, { history }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: history,
    };
  }),
  on(fromHistoric.HistoricPaymentsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
