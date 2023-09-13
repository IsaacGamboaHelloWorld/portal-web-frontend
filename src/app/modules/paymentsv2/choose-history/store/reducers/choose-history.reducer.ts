import { Record } from '@modules/payments/home-payments/entities/historic-payments';
import { createReducer, on } from '@ngrx/store';
import * as fromHistoric from '../actions/choose-history.actions';

export interface IHistoricPayments {
  data: Record[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initChooseHistoryPayments: IHistoricPayments = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const chooseHistoryReducer = createReducer(
  initChooseHistoryPayments,
  on(fromHistoric.ChooseHistoryLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromHistoric.ChooseHistorySuccess, (state, { history }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: history,
    };
  }),
  on(fromHistoric.ChooseHistoryFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
