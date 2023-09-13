import { createReducer, on } from '@ngrx/store';

import { IAnswerPayStack } from '../../entities/pay-stack';
import * as fromPayStack from '../actions/pay-stack.actions';

export const initPayStack: IAnswerPayStack = {
  success: false,
  errorMessage: '',
  specificErrorMessage: null,
  approvalId: null,
  date: '',
  billerPayment: null,
  specificErrorCode: null,
};

export const paystackReducer = createReducer(
  initPayStack,
  on(fromPayStack.PayStackLoad, (state) => {
    return {
      ...state,
      success: false,
      date: '',
      billerPayment: null,
      errorMessage: '',
      specificErrorMessage: null,
      approvalId: null,
      specificErrorCode: null,
    };
  }),
  on(fromPayStack.PayStackSuccess, (state, { data }) => {
    return data;
  }),
  on(fromPayStack.PayStackFail, (state, { description, specificErrorCode }) => {
    return {
      success: false,
      errorMessage: description,
      specificErrorMessage: null,
      approvalId: null,
      date: '',
      billerPayment: null,
      specificErrorCode,
    };
  }),
  on(fromPayStack.PayStackReset, (state) => {
    return initPayStack;
  }),
);
