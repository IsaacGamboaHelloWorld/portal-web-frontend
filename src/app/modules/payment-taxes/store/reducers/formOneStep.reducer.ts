import { createReducer, on } from '@ngrx/store';
import {
  IDatePaymentTaxes,
  IPaymentTaxesFormOne,
} from '../../entities/payment-taxes';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOne: IPaymentTaxesFormOne = {
  account_origin: null,
  city: null,
  taxe: null,
  reference: null,
  amount: null,
};

export const newPaymentTaxeStepOneReducer = createReducer(
  initFormStepOne,
  on(fromStepOne.SetStepOnePaymentTaxes, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOnePaymentTaxes, (state) => {
    return initFormStepOne;
  }),
);

export const initFormDate: IDatePaymentTaxes = {
  date: null,
};

export const datePaymentTaxeStepThreeReducer = createReducer(
  initFormDate,
  on(fromStepOne.SetDatePaymentTaxes, (state, { fch }) => {
    return fch;
  }),
);
