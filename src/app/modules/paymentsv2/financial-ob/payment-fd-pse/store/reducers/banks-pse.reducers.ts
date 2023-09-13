import { createReducer, on } from '@ngrx/store';
import { IBanksPse } from '../../entities/banks-pse.interface';
import {
  failBanksPseAction,
  loadBanksPseAction,
  resetBanksPseAction,
  successBanksPseAction,
} from '../actions/banks-pse.actions';

export interface IBanksPseData {
  banks: IBanksPse[];
  success: boolean;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
}

export const initBanks: IBanksPseData = {
  banks: null,
  success: true,
  errorMessage: null,
  loaded: true,
  loading: false,
};

export const banksPseReducer = createReducer(
  initBanks,
  on(loadBanksPseAction, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(successBanksPseAction, (state, { banks }) => ({
    ...state,
    banks,
    loaded: true,
    loading: false,
  })),
  on(failBanksPseAction, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    loaded: true,
    loading: false,
  })),
  on(resetBanksPseAction, (state) => initBanks),
);
