import {
  TributaryIncomeTaxTCFail,
  TributaryIncomeTaxTCLoad,
  TributaryIncomeTaxTCReset,
  TributaryIncomeTaxTCSuccess,
} from '@app/modules/documents-ds/store/actions/tributary-income-tc.actions';
import { createReducer, on } from '@ngrx/store';
import { IIncomeTaxTCState } from '../state/documents.state';

export const initIncomeTaxTC: IIncomeTaxTCState = {
  errorMessage: '',
  success: false,
  loaded: false,
  loading: false,
  approvalId: '',
  dateTime: '',
  documentResponse: [],
  specificErrorMessage: '',
  fileUrl: '',
  base64: '',
  name: '',
};

export const TributaryIncomeTaxTCReducer = createReducer(
  initIncomeTaxTC,
  on(TributaryIncomeTaxTCLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      success: false,
      loaded: false,
      loading: true,
      approvalId: '',
      dateTime: '',
      documentResponse: [],
      specificErrorMessage: '',
    };
  }),
  on(TributaryIncomeTaxTCSuccess, (state, { income }) => {
    return {
      ...state,
      success: true,
      loaded: true,
      loading: false,
      approvalId: income.approvalId,
      dateTime: income.dateTime,
      documentResponse: income.documentResponse,
      specificErrorMessage: income.specificErrorMessage,
    };
  }),
  on(TributaryIncomeTaxTCFail, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      loaded: true,
      loading: false,
      success: false,
      approvalId: '',
      dateTime: '',
      documentResponse: [],
      specificErrorMessage: '',
    };
  }),
  on(TributaryIncomeTaxTCReset, (state) => {
    return initIncomeTaxTC;
  }),
);
