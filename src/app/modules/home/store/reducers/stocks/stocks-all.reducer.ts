import { Dividend, Stocks } from '@modules/home/entities/stocks.interface';
import { createReducer, on } from '@ngrx/store';

import {
  stocksAllFail,
  stocksAllLoad,
  stocksAllReset,
  stocksAllSuccess,
} from '@modules/home/store/actions/stocks.action';

export interface IStocksAllState {
  data: { stocksAval: Stocks[]; dividends: Dividend[] };
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  retries: number;
  code: string;
}

export const initStocksAll: IStocksAllState = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  retries: 0,
  code: '',
};

export const stocksAllReducer = createReducer(
  initStocksAll,
  on(stocksAllLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(stocksAllSuccess, (state, { all }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: all,
      retries: 0,
      code: '',
    };
  }),
  on(stocksAllFail, (state, { description, code }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      retries: state.retries + 1,
      code,
    };
  }),
  on(stocksAllReset, (state) => initStocksAll),
);
