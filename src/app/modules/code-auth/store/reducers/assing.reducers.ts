import { createReducer, on } from '@ngrx/store';

import { IAnswerAssignCodeAuth } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/assing.actions';

export const initAssignCodeAuth: IAnswerAssignCodeAuth = {
  numberAttemps: null,
  errorMessage: '',
  secureDataMessage: null,
  success: false,
  loading: false,
};

export const CodeAuthAssignReducer = createReducer(
  initAssignCodeAuth,
  on(fromCodeAuth.CodeAuthAssignLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      loading: true,
    };
  }),
  on(fromCodeAuth.CodeAuthAssignSuccess, (state, { data }) => {
    return {
      success: data.success,
      secureDataMessage: data.secureDataMessage,
      numberAttemps: data.numberAttemps,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthAssignFail, (state, { data }) => {
    return {
      success: false,
      errorMessage: data.errorMessage,
      secureDataMessage: data.secureDataMessage,
      numberAttemps: data.numberAttemps,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthAssignReset, (state) => {
    return initAssignCodeAuth;
  }),
);
