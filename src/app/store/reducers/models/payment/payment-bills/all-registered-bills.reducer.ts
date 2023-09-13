import { createReducer, on } from '@ngrx/store';
import { IBillerHomeResponse } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromBillsRegistered from '../../../../actions/models/payment/payment-bills/all-registered-bills.action';

export interface BillsRegisteredState {
  data: IBillerHomeResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initBillsRegistered: BillsRegisteredState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const allBillsRegisteredReducer = createReducer(
  initBillsRegistered,
  on(fromBillsRegistered.BillsRegisteredLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
    };
  }),
  on(fromBillsRegistered.BillsRegisteredFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
      loaded: false,
      loading: false,
      error: true,
    };
  }),
  on(fromBillsRegistered.BillsRegisteredSuccessAction, (state, { data }) => {
    return {
      data,
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromBillsRegistered.BillsRegisteredResetAction, (state) => {
    return initBillsRegistered;
  }),
);
