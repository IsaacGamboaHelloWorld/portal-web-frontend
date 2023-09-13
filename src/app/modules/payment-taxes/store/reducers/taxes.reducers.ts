import { createReducer, on } from '@ngrx/store';

import { ITaxes } from '../../entities/payment-taxes';
import * as fromTaxes from '../actions/taxes.actions';

export const initTaxes: ITaxes = {
  agreements: null,
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  specificErrorMessage: null,
  approvalId: null,
};

export const taxesReducer = createReducer(
  initTaxes,
  on(fromTaxes.TaxesLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorMessage: null,
      approvalId: null,
    };
  }),
  on(fromTaxes.TaxesSuccess, (state, { data }) => {
    return {
      agreements: data.agreements,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
      specificErrorMessage: null,
      approvalId: null,
    };
  }),
  on(fromTaxes.TaxesFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      specificErrorMessage: null,
      approvalId: null,
      ...state,
    };
  }),
  on(fromTaxes.TaxesReset, (state) => {
    return initTaxes;
  }),
);
