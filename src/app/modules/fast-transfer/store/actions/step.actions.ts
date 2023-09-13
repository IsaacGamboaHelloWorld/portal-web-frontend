import { createAction, props } from '@ngrx/store';
import { IStepFastTransfer } from '../../entities/fast-transfer.interface';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set StepFastTransfer',
  RESET_STEP = '[CREATION Step] Reset StepFastTransfer',
}

export const SetStepFastTransfer = createAction(
  TYPE_ACTIONS.SET_STEP,
  props<{ step: IStepFastTransfer }>(),
);
export const ResetStepFastTransfer = createAction(TYPE_ACTIONS.RESET_STEP);
