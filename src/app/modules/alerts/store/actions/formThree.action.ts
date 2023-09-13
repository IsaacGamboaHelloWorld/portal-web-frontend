import { createAction } from '@ngrx/store';
import { IAlertFormThree } from '../../entities/alerts';

const enum TypeActions {
  SET_STEP = '[CREATE ALERT] Set Form Three',
  RESET_STEP = '[CREATE ALERT] Reset Form Three',
}

export const SetStepThreeAlert = createAction(
  TypeActions.SET_STEP,
  (formThree: IAlertFormThree) => ({ formThree }),
);

export const ResetStepThreeAlert = createAction(TypeActions.RESET_STEP);
