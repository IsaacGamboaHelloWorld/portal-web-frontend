import { createAction } from '@ngrx/store';
import { IAlertFormTwo } from '../../entities/alerts';

const enum TypeActions {
  SET_STEP = '[CREATE ALERT] Set Form Two',
  RESET_STEP = '[CREATE ALERT] Reset Form Two',
}

export const SetStepTwoAlert = createAction(
  TypeActions.SET_STEP,
  (formTwo: IAlertFormTwo) => ({ formTwo }),
);

export const ResetStepTwoAlert = createAction(TypeActions.RESET_STEP);
