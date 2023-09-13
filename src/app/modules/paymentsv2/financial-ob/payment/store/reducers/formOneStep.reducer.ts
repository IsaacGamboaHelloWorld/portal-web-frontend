import { createReducer, on } from '@ngrx/store';
import { IPaymentFormOne } from '../../entities/new-payment';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOnePayment: IPaymentFormOne = {
  account_origin: null,
  loan_destination: null,
};

export const newPaymentStepOneReducer = createReducer(
  initFormStepOnePayment,
  on(fromStepOne.SetStepOnePayment, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOnePayment, (state) => {
    return initFormStepOnePayment;
  }),
);
