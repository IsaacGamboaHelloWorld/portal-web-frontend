import { createAction, props } from '@ngrx/store';
import { StepLineTime } from '../../entities/your-plus.interface';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepYourPlus = createAction(
  TYPE_ACTIONS.SET_STEP,
  props<{ step: StepLineTime }>(),
);
export const ResetStepYourPlus = createAction(TYPE_ACTIONS.RESET_STEP);
