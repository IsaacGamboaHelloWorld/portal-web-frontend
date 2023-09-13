import { createReducer, on } from '@ngrx/store';
import { IAgreementSaved } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromAgreement from '../../../../actions/models/payment/payment-bills/save-company.action';

export interface SavedAgreementState {
  data: IAgreementSaved;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initSavedAgreement: SavedAgreementState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const saveAgreementReducer = createReducer(
  initSavedAgreement,
  on(fromAgreement.SaveCompanyLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAgreement.SaveCompanySuccessAction, (state, { service }) => {
    return {
      data: service,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromAgreement.SaveCompanyFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromAgreement.SaveCompanyResetAction, (state) => {
    return initSavedAgreement;
  }),
);
