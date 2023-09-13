import { createAction } from '@ngrx/store';
import { StepLineTime } from '../state/financial-op-module.state';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
  SET_FREE_DESTINATION = '[NAVIGATE PAYMENT] Set is free destination',
}

export const SetStepOb = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepLineTime) => ({
    step,
  }),
);
export const ResetStepOb = createAction(TYPE_ACTIONS.RESET_STEP);
