import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  SET_STEP = '[Recharge] Set Step',
  RESET_STEP = '[Recharge] Reset Step',
}

export const setStepRecharge = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: number) => ({ step }),
);
export const resetStepRecharge = createAction(TYPE_ACTIONS.RESET_STEP);
