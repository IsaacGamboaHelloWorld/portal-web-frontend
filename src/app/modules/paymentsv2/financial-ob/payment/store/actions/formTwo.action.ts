import { createAction } from '@ngrx/store';
import { IPaymentFormTwo } from '../../entities/new-payment';

const enum TypeActions {
  SET_STEP = '[CREATE PAYMENT] Set Form Two',
  RESET_STEP = '[CREATE PAYMENT] Reset Form Two',
}

export const SetStepTwoPayment = createAction(
  TypeActions.SET_STEP,
  (formTwo: IPaymentFormTwo) => ({ formTwo }),
);

export const ResetStepTwoPayment = createAction(TypeActions.RESET_STEP);
