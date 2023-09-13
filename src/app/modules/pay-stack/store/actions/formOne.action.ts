import { createAction } from '@ngrx/store';
import { IDatePayStack, IPayStackFormOne } from '../../entities/pay-stack';

const enum TypeActions {
  SET_STEP = '[CREATE STEP_ONE] Set',
  DATE_STEP = '[CREATE STEP_ONE] Date',
  RESET_STEP = '[CREATE STEP_ONE] Reset',
}

export const SetStepOnePayStack = createAction(
  TypeActions.SET_STEP,
  (formOne: IPayStackFormOne) => ({ formOne }),
);

export const ResetStepOnePayStack = createAction(TypeActions.RESET_STEP);

export const SetDatePayStack = createAction(
  TypeActions.DATE_STEP,
  (fch: IDatePayStack) => ({ fch }),
);
