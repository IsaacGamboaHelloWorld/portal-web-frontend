import { createReducer, on } from '@ngrx/store';

import { IAnswerPayRoll } from '../../entities/pay-stack';
import * as fromPayRoll from '../actions/payroll.actions';

export const initPayRoll: IAnswerPayRoll = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  agreements: [],
  success: false,
};

export const payrollReducer = createReducer(
  initPayRoll,
  on(fromPayRoll.PayrollLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      specificErrorMessage: null,
      approvalId: null,
      agreements: [],
      success: false,
    };
  }),
  on(fromPayRoll.PayrollSuccess, (state, { data }) => {
    return {
      success: data.success,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
      approvalId: data.approvalId,
      agreements: data.agreements,
    };
  }),
  on(fromPayRoll.PayrollFail, (state, { description }) => {
    return {
      errorMessage: description,
      specificErrorMessage: null,
      approvalId: null,
      agreements: null,
      success: false,
    };
  }),
  on(fromPayRoll.PayrollReset, (state) => {
    return initPayRoll;
  }),
);
