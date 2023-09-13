import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION PAYMENT] Set Step',
  RESET_STEP = '[CREATION PAYMENT] Reset Step',
}

export const SetStepPayment = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: number) => ({ step }),
);
export const ResetStepPayment = createAction(TYPE_ACTIONS.RESET_STEP);
