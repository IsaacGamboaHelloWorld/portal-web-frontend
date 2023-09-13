import { createReducer, on } from '@ngrx/store';
import * as fromInfoPayment from '../actions/info-payments.actions';
import { IInfoPayments } from './../state/registered-sp-module.state';

const initialState: IInfoPayments = {
  billWithError: false,
  billWithErrorMessage: '',
  isBill: false,
};

export const infoPaymentUtilReducer = createReducer(
  initialState,
  on(
    fromInfoPayment.InfoPaymentUtilSetError,
    (state, { billWithError, billWithErrorMessage }) => ({
      ...state,
      billWithError,
      billWithErrorMessage,
    }),
  ),
  on(fromInfoPayment.InfoPaymentUtilResetError, (state) => ({
    ...state,
    billWithError: initialState.billWithError,
    billWithErrorMessage: initialState.billWithErrorMessage,
  })),
  on(fromInfoPayment.InfoPaymentUtilSetIsBill, (state, { isBill }) => ({
    ...state,
    isBill,
  })),
);
