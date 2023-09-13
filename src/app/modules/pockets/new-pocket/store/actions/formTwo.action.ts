import { createAction } from '@ngrx/store';
import { IPocketFormTwo } from '../../entities/new-pockets';

const enum TypeActions {
  SET_STEP = '[CREATE POCKET] Set Form Two',
  RESET_STEP = '[CREATE POCKET] Reset Form Two',
}

export const SetStepTwoPockets = createAction(
  TypeActions.SET_STEP,
  (formTwo: IPocketFormTwo) => ({ formTwo }),
);

export const ResetStepTwoPockets = createAction(TypeActions.RESET_STEP);
