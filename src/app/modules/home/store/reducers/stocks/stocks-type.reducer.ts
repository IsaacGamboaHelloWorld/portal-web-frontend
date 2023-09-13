import { createReducer, on } from '@ngrx/store';

import { IStockType } from '@modules/home/entities/stocks.interface';
import {
  stocksTypeFail,
  stocksTypeLoad,
  stocksTypeSuccess,
} from '@modules/home/store/actions/stocks.action';

export interface IStocksTypeState {
  data: IStockType[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initStocksType: IStocksTypeState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const stocksTypeReducer = createReducer(
  initStocksType,
  on(stocksTypeLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(stocksTypeSuccess, (state, { stockType }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: stockType,
    };
  }),
  on(stocksTypeFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
