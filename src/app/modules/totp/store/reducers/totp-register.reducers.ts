import { createReducer, on } from '@ngrx/store';
import {
  TotpRegisterFail,
  TotpRegisterLoad,
  TotpRegisterReset,
  TotpRegisterSuccess,
} from '../actions/totp-register.actions';
import { ITotpRegister } from '../state/totp.state';

export const initTotpRegister: ITotpRegister = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const TotpRegisterReducer = createReducer(
  initTotpRegister,
  on(TotpRegisterLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(TotpRegisterSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(TotpRegisterFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(TotpRegisterReset, (_state) => initTotpRegister),
);
