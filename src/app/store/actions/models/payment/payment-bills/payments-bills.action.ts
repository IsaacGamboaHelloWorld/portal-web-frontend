import { PaymentBillsInterface } from '@core/interfaces/paymentBills.interface';
import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[Account Payment] Products Bills Load',
  SUCCESS = '[Account Payment] Products Bills Success',
  FAIL = '[Account Payment] Products Bills Fail',
  RESET = '[Account Payment] Products Bills reset',
}

export const PaymentBillsLoadAction = createAction(TYPE_ACTIONS.LOAD);

export const PaymentBillsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const PaymentBillsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (bills: PaymentBillsInterface[]) => ({ bills }),
);

export const PaymentBillsResetAction = createAction(TYPE_ACTIONS.RESET);
