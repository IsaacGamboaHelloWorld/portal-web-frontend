import { createAction } from '@ngrx/store';
import { IAlertFormOne } from '../../entities/alerts';

const enum TypeActions {
  SET_STEP = '[CREATE ALERT] Set Form One',
  RESET_STEP = '[CREATE ALERT] Reset Form One',
}

export const SetStepOneAlert = createAction(
  TypeActions.SET_STEP,
  (formOne: IAlertFormOne) => ({ formOne }),
);

export const ResetStepOneAlert = createAction(TypeActions.RESET_STEP);
