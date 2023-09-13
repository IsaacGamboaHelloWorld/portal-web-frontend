import { Record } from '@modules/payments/home-payments/entities/historic-payments';
import { createReducer, on } from '@ngrx/store';
import * as fromHistoric from '../actions/payment-history.actions';

export interface IHistoricPayments {
  data: Record[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initPaymentHistoryPayments: IHistoricPayments = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const paymentHistoryReducer = createReducer(
  initPaymentHistoryPayments,
  on(fromHistoric.PaymentHistoryLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromHistoric.PaymentHistorySuccess, (state, { history }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: history,
    };
  }),
  on(fromHistoric.PaymentHistoryFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
