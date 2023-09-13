import { createReducer, on } from '@ngrx/store';

import { EnrollSecureData, IAnswerGetQuestion } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/home-auth.actions';

export const initEnrollSecureData: EnrollSecureData = {
  secretId: '',
  secret: '',
  acctId: '',
  acctType: '',
  secureDataMessage: '',
  secureDataLength: null,
};

export const initSecureQuestion: IAnswerGetQuestion = {
  success: false,
  errorMessage: '',
  enrollmentSecureData: initEnrollSecureData,
  loading: false,
};

export const CodeAuthSecureQuestionReducer = createReducer(
  initSecureQuestion,
  on(fromCodeAuth.CodeAuthSecureQuestionLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      loading: true,
      enrollmentSecureData: null,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureQuestionSuccess, (state, { data }) => {
    return {
      success: data.success,
      errorMessage: data.errorMessage,
      enrollmentSecureData: data.enrollmentSecureData,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureQuestionFail, (state, { data }) => {
    return {
      success: false,
      errorMessage: data.errorMessage,
      loading: false,
      enrollmentSecureData: data.enrollmentSecureData,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureQuestionReset, (state) => {
    return initSecureQuestion;
  }),
);
