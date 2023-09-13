import { createAction } from '@ngrx/store';
import {
  IDatePaymentTaxes,
  IPaymentTaxesFormOne,
} from '../../entities/payment-taxes';

const enum TypeActions {
  SET_STEP = '[CREATE STEP_ONE] Set',
  DATE_STEP = '[CREATE STEP_ONE] Date',
  RESET_STEP = '[CREATE STEP_ONE] Reset',
}

export const SetStepOnePaymentTaxes = createAction(
  TypeActions.SET_STEP,
  (formOne: IPaymentTaxesFormOne) => ({ formOne }),
);

export const ResetStepOnePaymentTaxes = createAction(TypeActions.RESET_STEP);

export const SetDatePaymentTaxes = createAction(
  TypeActions.DATE_STEP,
  (fch: IDatePaymentTaxes) => ({ fch }),
);
