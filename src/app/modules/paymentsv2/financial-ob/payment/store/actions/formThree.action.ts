import { createAction } from '@ngrx/store';
import { IPaymentFormThree } from '../../entities/new-payment';

const enum TypeActions {
  SET_STEP = '[CREATE PAYMENT] Set Form Three',
  RESET_STEP = '[CREATE PAYMENT] Reset Form Three',
}

export const SetStepThreePayment = createAction(
  TypeActions.SET_STEP,
  (formThree: IPaymentFormThree) => ({ formThree }),
);

export const ResetStepThreePayment = createAction(TypeActions.RESET_STEP);
