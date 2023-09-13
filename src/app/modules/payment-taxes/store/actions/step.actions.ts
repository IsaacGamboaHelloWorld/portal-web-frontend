import { createAction } from '@ngrx/store';
import { StepLineTime } from '../../entities/payment-taxes';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepTaxes = createAction(
  TYPE_ACTIONS.SET_STEP,
  (step: StepLineTime) => ({
    step,
  }),
);
export const ResetStepTaxes = createAction(TYPE_ACTIONS.RESET_STEP);
