import { createReducer, on } from '@ngrx/store';

import { IReference } from '../../entities/payment-taxes';
import * as fromReference from '../actions/reference.actions';

export const initTaxes: IReference = {
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  specificErrorMessage: null,
  approvalId: null,
  amount: 0,
  currencyCode: '',
  effectiveDate: null,
  expirationDate: null,
  dueDate: null,
};

export const referenceReducer = createReducer(
  initTaxes,
  on(fromReference.ReferenceLoad, (state) => {
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
  on(fromReference.ReferenceSuccess, (state, { data }) => {
    return {
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
      specificErrorMessage: null,
      approvalId: null,
      amount: data.amount,
      currencyCode: data.currencyCode,
      effectiveDate: data.effectiveDate,
      expirationDate: data.expirationDate,
      dueDate: data.dueDate,
    };
  }),
  on(fromReference.ReferenceFail, (state, { description }) => {
    return {
      success: false,
      errorMessage: description,
      loading: false,
      loaded: false,
      error: true,
      specificErrorMessage: null,
      approvalId: null,
      amount: 0,
      currencyCode: '',
      effectiveDate: null,
      expirationDate: null,
      dueDate: null,
    };
  }),
  on(fromReference.ReferenceReset, (state) => {
    return initTaxes;
  }),
);
