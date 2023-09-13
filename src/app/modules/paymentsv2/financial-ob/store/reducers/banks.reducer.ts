import { createReducer, on } from '@ngrx/store';
import { IBank } from '../../entities/financial-op';
import * as fromBanks from '../actions/banks.action';

export interface IBanks {
  data: IBank[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initBanks: IBanks = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
};

export const loansBanksReducer = createReducer(
  initBanks,
  on(fromBanks.BanksLoadAction, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: false,
    };
  }),
  on(fromBanks.BanksSuccessAction, (state, { banks }) => {
    return {
      data: banks,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromBanks.BanksFailAction, (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
    };
  }),
);
