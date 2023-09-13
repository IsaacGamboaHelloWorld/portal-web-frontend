import { createAction } from '@ngrx/store';
import { StepLineTime } from '../../entities/pay-stack';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepPayStack = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepLineTime) => ({
    step,
  }),
);
export const ResetStepPayStack = createAction(TYPE_ACTIONS.RESET_STEP);
