import { createReducer, on } from '@ngrx/store';
import { IAgreementSaved } from '../../entities/enroll';
import * as fromAgreement from '../actions/save-agreement.action';

export interface ISavedAgreement {
  data: IAgreementSaved;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initSavedAgreement: ISavedAgreement = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
};

export const saveAgreementReducer = createReducer(
  initSavedAgreement,
  on(fromAgreement.EnrollLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAgreement.EnrollSuccessAction, (state, { service }) => {
    return {
      data: service,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAgreement.EnrollFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromAgreement.EnrollResetAction, (state) => {
    return initSavedAgreement;
  }),
);
