import { createReducer, on } from '@ngrx/store';
import { IPublicService } from '../../entities/public-services';
import * as fromAll from '../actions/registered-bills.action';

export interface IAllPublicServicesPayments {
  bills: IPublicService[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initAllPublicServicesPayments: IAllPublicServicesPayments = {
  bills: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const allPaymentsReducer = createReducer(
  initAllPublicServicesPayments,
  on(fromAll.AllPublicServicesPaymentsReset, (state) => {
    return initAllPublicServicesPayments;
  }),
  on(fromAll.AllPublicServicesPaymentsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAll.AllPublicServicesPaymentsSuccess, (state, { billers }) => {
    return {
      bills: billers,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAll.AllPublicServicesPaymentsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
