import { createAction } from '@ngrx/store';

const enum TypeActions {
  SET_ERROR = '[SELECT INFO-PAYMENT / UTILS] Set error',
  RESET_ERROR = '[SELECT INFO-PAYMENT / UTILS] Reset error',
  SET_IS_BILL = '[SELECT INFO-PAYMENT / UTILS] Set is bill',
}

export const InfoPaymentUtilSetError = createAction(
  TypeActions.SET_ERROR,
  (billWithError: boolean, billWithErrorMessage: string) => ({
    billWithError,
    billWithErrorMessage,
  }),
);

export const InfoPaymentUtilResetError = createAction(TypeActions.RESET_ERROR);

export const InfoPaymentUtilSetIsBill = createAction(
  TypeActions.SET_IS_BILL,
  (isBill: boolean) => ({ isBill }),
);
