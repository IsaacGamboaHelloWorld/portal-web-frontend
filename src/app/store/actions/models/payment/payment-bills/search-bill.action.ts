import { PaymentBillsInterface } from '@core/interfaces/paymentBills.interface';
import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[Searched Payment] Products Searched Bill Load',
  SUCCESS = '[Searched Payment] Products Searched Bill Success',
  FAIL = '[Searched Payment] Products Searched Bill Fail',
  RESET = '[Searched Payment] Products Searched Bill Load',
}

export const PaymentSearchedBillLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (dataSend: string) => ({
    dataSend,
  }),
);

export const PaymentSearchedBillFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const PaymentSearchedBillSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (bill: PaymentBillsInterface) => ({ bill }),
);

export const PaymentSearchedBillResetAction = createAction(TYPE_ACTIONS.RESET);
