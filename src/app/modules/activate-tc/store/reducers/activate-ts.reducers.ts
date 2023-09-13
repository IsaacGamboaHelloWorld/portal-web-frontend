import { createReducer, on } from '@ngrx/store';

import {
  IAnswerActivateTc,
  IDetailActivateTc,
} from '../../entities/activate-tc';
import * as fromPaymentTaxes from '../actions/activate-tc.actions';

const detailActivateTc: IDetailActivateTc = {
  companyId: '',
  accountId: '',
  accountType: '',
};

export const initActivateTc: IAnswerActivateTc = {
  approvalId: '',
  errorMessage: '',
  specificErrorMessage: '',
  details: detailActivateTc,
  success: false,
};

export const ActivateTcReducer = createReducer(
  initActivateTc,
  on(fromPaymentTaxes.ActivateTcLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      approvalId: '',
    };
  }),
  on(fromPaymentTaxes.ActivateTcSuccess, (state, { data }) => {
    return {
      success: data.success,
      approvalId: data.approvalId,
      details: data.details,
    };
  }),
  on(fromPaymentTaxes.ActivateTcFail, (state, { data }) => {
    return {
      success: false,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
      approvalId: data.approvalId,
    };
  }),
  on(fromPaymentTaxes.ActivateTcReset, (state) => {
    return initActivateTc;
  }),
);
