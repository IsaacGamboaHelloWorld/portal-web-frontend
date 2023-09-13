import { createReducer, on } from '@ngrx/store';

import { IStockPeriod } from '@modules/home/entities/stocks.interface';
import {
  stocksPeriodFail,
  stocksPeriodLoad,
  stocksPeriodSuccess,
} from '@modules/home/store/actions/stocks.action';

export interface IStocksPeriodState {
  data: IStockPeriod[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initStocksPeriod: IStocksPeriodState = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const stocksPeriodReducer = createReducer(
  initStocksPeriod,
  on(stocksPeriodLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(stocksPeriodSuccess, (state, { period }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: period,
    };
  }),
  on(stocksPeriodFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
