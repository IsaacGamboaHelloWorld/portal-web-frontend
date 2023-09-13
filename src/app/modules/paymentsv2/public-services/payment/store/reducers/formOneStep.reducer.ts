import { createReducer, on } from '@ngrx/store';
import { IPaymentFormOne } from '../../entities/new-payment';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOnePayment: IPaymentFormOne = {
  account_origin: null,
  service_destination: null,
};

export const newPaymenttepOneReducer = createReducer(
  initFormStepOnePayment,
  on(fromStepOne.SetStepOnePayment, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOnePayment, (state) => {
    return initFormStepOnePayment;
  }),
);
