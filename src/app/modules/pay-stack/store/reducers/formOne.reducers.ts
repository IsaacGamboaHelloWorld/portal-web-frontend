import { createReducer, on } from '@ngrx/store';
import { IDatePayStack, IPayStackFormOne } from '../../entities/pay-stack';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOne: IPayStackFormOne = {
  account_origin: null,
  payroll: null,
  type_payment: null,
  number_payroll: null,
  month: null,
  period: null,
  amount: null,
};

export const newPayStackStepOneReducer = createReducer(
  initFormStepOne,
  on(fromStepOne.SetStepOnePayStack, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOnePayStack, (state) => {
    return initFormStepOne;
  }),
);

export const initFormDate: IDatePayStack = {
  date: null,
};

export const dateStepThreeReducer = createReducer(
  initFormDate,
  on(fromStepOne.SetDatePayStack, (state, { fch }) => {
    return fch;
  }),
);
