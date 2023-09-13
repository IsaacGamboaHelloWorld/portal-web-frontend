import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { createReducer, on } from '@ngrx/store';

import * as fromExtracts from '../actions/extracts.actions';

export const initExtracts: IPdfdata = {
  account: null,
  data: '',
  base64: '',
  name: '',
  type: '',
  success: false,
  loaded: false,
  loading: false,
  errorMessage: null,
  accountInformation: null,
};

export const ExtractsReducer = createReducer(
  initExtracts,
  on(fromExtracts.ExtractsLoad, (state) => {
    return {
      ...state,
      account: null,
      accountInformation: null,
      data: '',
      base64: '',
      name: '',
      type: '',
      loaded: false,
      loading: true,
    };
  }),
  on(fromExtracts.ExtractsSuccess, (state, { pdfData }) => {
    return {
      account: pdfData.account,
      accountInformation: pdfData.accountInformation,
      data: pdfData.data,
      base64: pdfData.base64,
      name: pdfData.name,
      type: pdfData.type,
      success: true,
      loaded: true,
      loading: false,
    };
  }),
  on(fromExtracts.ExtractsFail, (state, { errorMessage }) => {
    return {
      account: null,
      accountInformation: null,
      data: '',
      base64: '',
      name: '',
      success: false,
      loaded: true,
      loading: false,
      type: errorMessage,
    };
  }),
  on(fromExtracts.ExtractsReset, (state) => {
    return initExtracts;
  }),
);
