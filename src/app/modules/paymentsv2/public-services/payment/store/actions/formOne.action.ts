import { createAction } from '@ngrx/store';
import { IPaymentFormOne } from '../../entities/new-payment';

const enum TypeActions {
  SET_STEP = '[CREATE PAYMENT] Set Form One',
  RESET_STEP = '[CREATE PAYMENT] Reset Form One',
}

export const SetStepOnePayment = createAction(
  TypeActions.SET_STEP,
  (formOne: IPaymentFormOne) => ({ formOne }),
);

export const ResetStepOnePayment = createAction(TypeActions.RESET_STEP);
