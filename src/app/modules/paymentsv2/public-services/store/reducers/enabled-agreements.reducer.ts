import { createReducer, on } from '@ngrx/store';
import { EnabledAgreementsResponse } from '../../entities/enabled-agreements';
import * as enabledAgreementsActions from '../actions/enabled-agreements-on-scheduled-payment.action';

export interface EnabledAgreementsState {
  data: EnabledAgreementsResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
  description: string;
}

export const initData: EnabledAgreementsState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
  description: null,
};

export const enabledAgreementsReducer = createReducer(
  initData,
  on(enabledAgreementsActions.EnabledAgreementsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(enabledAgreementsActions.EnabledAgreementsSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(
    enabledAgreementsActions.EnabledAgreementsFails,
    (state, { description }) => {
      return {
        ...state,
        error: true,
        loading: false,
        loaded: false,
        description,
      };
    },
  ),
  on(enabledAgreementsActions.EnabledAgreementsReset, (state) => {
    return initData;
  }),
);
