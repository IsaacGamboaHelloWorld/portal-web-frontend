import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION POCKET] Set Step',
  RESET_STEP = '[CREATION POCKET] Reset Step',
}

export const SetStepPocket = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: number) => ({ step }),
);
export const ResetStepPocket = createAction(TYPE_ACTIONS.RESET_STEP);
