import { createReducer, on } from '@ngrx/store';
import { IPublicService } from '../../entities/public-services';
import * as fromNext from '../actions/next-payments.actions';

export interface INextPublicServicesPayments {
  bills: IPublicService[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initNextPublicServicesPayments: INextPublicServicesPayments = {
  bills: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const nextPaymentsReducer = createReducer(
  initNextPublicServicesPayments,
  on(fromNext.NextPublicServicesPaymentsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromNext.NextPublicServicesPaymentsSuccess, (state, { billers }) => {
    return {
      bills: billers,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromNext.NextPublicServicesPaymentsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
