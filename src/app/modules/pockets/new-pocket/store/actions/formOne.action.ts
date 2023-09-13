import { createAction } from '@ngrx/store';
import { IPocketFormOne } from '../../entities/new-pockets';

const enum TypeActions {
  SET_STEP = '[CREATE POCKET] Set Form One',
  RESET_STEP = '[CREATE POCKET] Reset Form One',
}

export const SetStepOnePockets = createAction(
  TypeActions.SET_STEP,
  (formOne: IPocketFormOne) => ({ formOne }),
);

export const ResetStepOnePockets = createAction(TypeActions.RESET_STEP);
