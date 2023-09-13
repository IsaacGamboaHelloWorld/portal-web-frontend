import { createReducer, on } from '@ngrx/store';

import { IAnswerSecureValidQuestion } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/home-auth.actions';

export const initSecureValidQuestion: IAnswerSecureValidQuestion = {
  success: false,
  loading: false,
  errorStatusCode: '',
  errorMessage: '',
  specificErrorMessage: '',
};

export const CodeAuthSecureValidQuestionReducer = createReducer(
  initSecureValidQuestion,
  on(fromCodeAuth.CodeAuthSecureValidQuestionLoad, (state) => {
    return {
      ...state,
      success: false,
      loading: true,
      errorStatusCode: '',
      errorMessage: '',
      specificErrorMessage: '',
    };
  }),
  on(fromCodeAuth.CodeAuthSecureValidQuestionSuccess, (state, { data }) => {
    return {
      success: data.success,
      loading: false,
      errorStatusCode: data.errorStatusCode,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureValidQuestionFail, (state, { data }) => {
    return {
      success: false,
      loading: false,
      errorStatusCode: data.errorStatusCode,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureValidQuestionReset, (state) => {
    return initSecureValidQuestion;
  }),
);
