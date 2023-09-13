import { createReducer, on } from '@ngrx/store';
import {
  TotpGenerateFail,
  TotpGenerateLoad,
  TotpGenerateReset,
  TotpGenerateSuccess,
} from '../actions/totp-generate.actions';
import { ITotpGenerate } from '../state/totp.state';

export const initTotpGenerate: ITotpGenerate = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const TotpGenerateReducer = createReducer(
  initTotpGenerate,
  on(TotpGenerateLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(TotpGenerateSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(TotpGenerateFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(TotpGenerateReset, (_state) => initTotpGenerate),
);
