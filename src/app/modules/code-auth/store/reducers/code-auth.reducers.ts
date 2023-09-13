import { createReducer, on } from '@ngrx/store';

import { IAnswerAllowedCodeAuth } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/code-auth.actions';

export const initAllowedCodeAuth: IAnswerAllowedCodeAuth = {
  userAlreadyHasEnhanced: false,
  userAlreadyHasHard: false,
  errorMessage: '',
  enrollmentSecureData: null,
  success: false,
};

export const CodeAuthAllowedReducer = createReducer(
  initAllowedCodeAuth,
  on(fromCodeAuth.CodeAuthAllowedLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      userAlreadyHasEnhanced: false,
      userAlreadyHasHard: false,
      success: false,
    };
  }),
  on(fromCodeAuth.CodeAuthAllowedSuccess, (state, { data }) => {
    return {
      success: data.success,
      errorMessage: data.errorMessage,
      enrollmentSecureData: data.enrollmentSecureData,
      userAlreadyHasEnhanced: data.userAlreadyHasEnhanced,
      userAlreadyHasHard: data.userAlreadyHasHard,
    };
  }),
  on(fromCodeAuth.CodeAuthAllowedFail, (state, { data }) => {
    return {
      success: false,
      errorMessage: data.errorMessage,
      enrollmentSecureData: data.enrollmentSecureData,
      userAlreadyHasEnhanced: data.userAlreadyHasEnhanced,
      userAlreadyHasHard: data.userAlreadyHasHard,
    };
  }),
  on(fromCodeAuth.CodeAuthAllowedReset, (state) => {
    return initAllowedCodeAuth;
  }),
);
