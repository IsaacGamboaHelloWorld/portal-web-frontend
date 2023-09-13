import { createAction } from '@ngrx/store';
import { IPocketFormThree } from '../../entities/new-pockets';

const enum TypeActions {
  SET_STEP = '[CREATE POCKET] Set Form Three',
  RESET_STEP = '[CREATE POCKET] Reset Form Three',
}

export const SetStepThreePockets = createAction(
  TypeActions.SET_STEP,
  (formThree: IPocketFormThree) => ({ formThree }),
);

export const ResetStepThreePockets = createAction(TypeActions.RESET_STEP);
