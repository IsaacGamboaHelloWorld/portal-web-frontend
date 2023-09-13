import { createAction } from '@ngrx/store';
import { StepLineTime } from '../state/public-services-module.state';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepSp = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepLineTime) => ({
    step,
  }),
);
export const ResetStepSp = createAction(TYPE_ACTIONS.RESET_STEP);
