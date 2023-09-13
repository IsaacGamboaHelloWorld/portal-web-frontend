import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IStatement } from '@app/core/interfaces/statement/statement';
import { createReducer, on } from '@ngrx/store';

import * as fromExtracts from '../actions/extracts.actions';

export const initPeriods: IStatement = {
  account: null,
  periods: [],
  success: false,
  errorMesg: '',
  type: '',
};

export const initExtracts: IPdfdata = {
  account: null,
  data: '',
  base64: '',
  name: '',
  type: '',
};

export const ExtractsReducer = createReducer(
  initExtracts,
  on(fromExtracts.ExtractsLoad, (state) => {
    return {
      ...state,
      account: null,
      data: '',
      base64: '',
      name: '',
      type: '',
    };
  }),
  on(fromExtracts.ExtractsSuccess, (state, { data }) => {
    return {
      account: data.account,
      data: data.data,
      base64: data.base64,
      name: data.name,
      type: data.type,
    };
  }),
  on(fromExtracts.ExtractsFail, (state, { data }) => {
    return {
      account: null,
      data: '',
      base64: '',
      name: '',
      type: data,
    };
  }),
  on(fromExtracts.ExtractsReset, (state) => {
    return initExtracts;
  }),
);

export const ExtractsPeriodsReducer = createReducer(
  initPeriods,
  on(fromExtracts.ExtractsPeriodsLoad, (state) => {
    return {
      ...state,
      account: null,
      periods: [],
      success: false,
      errorMesg: '',
      type: '',
    };
  }),
  on(fromExtracts.ExtractsPeriodsSuccess, (state, { data }) => {
    return {
      account: data.account,
      periods: data.periods,
      success: data.success,
      errorMesg: data.errorMesg,
      type: data.type,
    };
  }),
  on(fromExtracts.ExtractsPeriodsFail, (state, { data }) => {
    return {
      account: null,
      periods: [],
      success: false,
      errorMesg: data,
      type: '',
    };
  }),
  on(fromExtracts.ExtractsPeriodsReset, (state) => {
    return initPeriods;
  }),
);
