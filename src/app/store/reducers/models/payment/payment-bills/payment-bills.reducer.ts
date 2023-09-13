import { PaymentBillsInterface } from '@app/core/interfaces/paymentBills.interface';
import { createReducer, on } from '@ngrx/store';
import * as fromDestination from '../../../../actions/models/payment/payment-bills/payments-bills.action';

export interface BillsUserState {
  bills: PaymentBillsInterface[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initBillsUser: BillsUserState = {
  bills: [],
  loading: false,
  loaded: false,
  error: false,
};

export const billsUserReducer = createReducer(
  initBillsUser,
  on(fromDestination.PaymentBillsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
    };
  }),
  on(fromDestination.PaymentBillsFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
      loaded: false,
      loading: false,
      error: true,
    };
  }),
  on(fromDestination.PaymentBillsSuccessAction, (state, { bills }) => {
    return {
      bills,
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromDestination.PaymentBillsResetAction, (state) => {
    return initBillsUser;
  }),
);
