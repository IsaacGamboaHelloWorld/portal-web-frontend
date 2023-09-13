import { createReducer, on } from '@ngrx/store';
import {
  TotpDeleteFail,
  TotpDeleteLoad,
  TotpDeleteReset,
  TotpDeleteSuccess,
} from '../actions/totp-delete.actions';
import { ITotpDelete } from '../state/totp.state';

export const initTotpDelete: ITotpDelete = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const TotpDeleteReducer = createReducer(
  initTotpDelete,
  on(TotpDeleteLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(TotpDeleteSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(TotpDeleteFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(TotpDeleteReset, (_state) => initTotpDelete),
);
