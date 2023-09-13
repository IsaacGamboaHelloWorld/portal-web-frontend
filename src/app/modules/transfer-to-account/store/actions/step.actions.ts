import { createAction, props } from '@ngrx/store';
import { IStepNewTransfer } from '../../entities/new-transfer.interface';

const enum TYPE_ACTIONS {
  SET_STEP = '[CREATION Step] Set Step',
  RESET_STEP = '[CREATION Step] Reset Step',
}

export const SetStepNewTransfer = createAction(
  TYPE_ACTIONS.SET_STEP,
  props<{ step: IStepNewTransfer }>(),
);
export const ResetStepNewTransfer = createAction(TYPE_ACTIONS.RESET_STEP);
