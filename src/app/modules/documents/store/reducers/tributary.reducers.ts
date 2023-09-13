import { createReducer, on } from '@ngrx/store';
import { IincomeTax, IincomeTaxTC, ITributary } from '../../entities/documents';
import { IincomeRac } from '../../entities/tributary';

import * as fromTributary from '../actions/tributary.actions';

export const initGmf: ITributary = {
  errorMessage: '',
  fileUrl: '',
  base64: '',
  name: '',
  success: false,
};

export const initIncomeTax: IincomeTax = {
  errorMessage: '',
  fileUrl: '',
  base64: '',
  name: '',
  success: false,
};

export const initIncomeTaxTC: IincomeTaxTC = {
  errorMessage: '',
  success: false,
  approvalId: '',
  dateTime: '',
  documentResponse: [],
  specificErrorMessage: '',
};

export const initIncomeRac: IincomeRac = {
  errorMessage: '',
  success: false,
  approvalId: '',
  dateTime: '',
  specificErrorMessage: '',
  base64: '',
  name: '',
};

///// GMF
export const TributaryReducer = createReducer(
  initGmf,
  on(fromTributary.TributaryLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromTributary.TributarySuccess, (state, { data }) => {
    return {
      success: data.success,
      fileUrl: data.fileUrl,
      base64: data.base64,
      name: data.name,
      errorMessage: data.errorMessage,
    };
  }),
  on(fromTributary.TributaryFail, (state, { data }) => {
    return {
      errorMessage: data,
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromTributary.TributaryReset, (state) => {
    return initGmf;
  }),
);
/// Income Tax
export const TributaryIncomeReducer = createReducer(
  initIncomeTax,
  on(fromTributary.TributaryIncomeLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromTributary.TributaryIncomeSuccess, (state, { data }) => {
    return {
      success: data.success,
      fileUrl: data.fileUrl,
      base64: data.base64,
      name: data.name,
      errorMessage: data.errorMessage,
    };
  }),
  on(fromTributary.TributaryIncomeFail, (state, { data }) => {
    return {
      errorMessage: data,
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromTributary.TributaryIncomeReset, (state) => {
    return initIncomeTax;
  }),
);
/// Income Tax TC
export const TributaryIncomeTaxTCReducer = createReducer(
  initIncomeTaxTC,
  on(fromTributary.TributaryIncomeTaxTCLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      success: false,
      approvalId: '',
      dateTime: '',
      documentResponse: [],
      specificErrorMessage: '',
    };
  }),
  on(fromTributary.TributaryIncomeTaxTCSuccess, (state, { data }) => {
    return {
      errorMessage: data.errorMessage,
      success: data.success,
      approvalId: data.approvalId,
      dateTime: data.dateTime,
      documentResponse: data.documentResponse,
      specificErrorMessage: data.specificErrorMessage,
    };
  }),
  on(fromTributary.TributaryIncomeTaxTCFail, (state, { data }) => {
    return {
      errorMessage: data,
      success: false,
      approvalId: '',
      dateTime: '',
      documentResponse: [],
      specificErrorMessage: '',
    };
  }),
  on(fromTributary.TributaryIncomeTaxTCReset, (state) => {
    return initIncomeTax;
  }),
);
// RAC
export const TributaryIncomeRacReducer = createReducer(
  initIncomeRac,
  on(fromTributary.TributaryIncomeRacLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      success: false,
      approvalId: '',
      dateTime: '',
      specificErrorMessage: '',
      base64: null,
      name: '',
    };
  }),
  on(fromTributary.TributaryIncomeRacSuccess, (state, { data }) => {
    return {
      errorMessage: data.errorMessage,
      success: data.success,
      approvalId: data.approvalId,
      dateTime: data.dateTime,
      specificErrorMessage: data.specificErrorMessage,
      base64: data.base64,
      name: data.name,
    };
  }),
  on(fromTributary.TributaryIncomeRacFail, (state, { data }) => {
    return {
      errorMessage: data,
      success: false,
      approvalId: '',
      dateTime: '',
      specificErrorMessage: data,
      base64: null,
      name: '',
    };
  }),
  on(fromTributary.TributaryIncomeRacReset, (state) => {
    return initIncomeRac;
  }),
);
