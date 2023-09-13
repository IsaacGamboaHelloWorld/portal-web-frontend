import { createAction } from '@ngrx/store';
import { StepLineTime } from '../../entities/alerts';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepAlert = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepLineTime) => ({
    step,
  }),
);
export const ResetStepAlert = createAction(TYPE_ACTIONS.RESET_STEP);
