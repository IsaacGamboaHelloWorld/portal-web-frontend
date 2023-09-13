import { createReducer, on } from '@ngrx/store';

import { IAnswerUpdateSecureData } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/home-auth.actions';

export const initSecureDataUpdateCodeAuth: IAnswerUpdateSecureData = {
  success: false,
  loading: false,
};

export const CodeAuthUpdateSecureDataReducer = createReducer(
  initSecureDataUpdateCodeAuth,
  on(fromCodeAuth.CodeAuthSecureDataUpdateLoad, (state) => {
    return {
      ...state,
      success: false,
      loading: true,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataUpdateSuccess, (state, { data }) => {
    return {
      success: data.success,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataUpdateFail, (state, { data }) => {
    return {
      success: data.success,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataUpdateReset, (state) => {
    return initSecureDataUpdateCodeAuth;
  }),
);
