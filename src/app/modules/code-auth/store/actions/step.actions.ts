import { createAction } from '@ngrx/store';
import { StepBar } from '../../entities/code-auth';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepCodeAuth = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepBar) => ({
    step,
  }),
);
export const ResetStepCodeAuth = createAction(TYPE_ACTIONS.RESET_STEP);
