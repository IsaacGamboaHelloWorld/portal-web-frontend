import { createReducer, on } from '@ngrx/store';
import { IPaymentFormTwo } from '../../entities/new-payment';
import * as fromStepTwo from '../actions/formTwo.action';

export const initFormStepTwoPayment: IPaymentFormTwo = {
  amount: null,
};

export const newPaymenttepTwoReducer = createReducer(
  initFormStepTwoPayment,
  on(fromStepTwo.SetStepTwoPayment, (state, { formTwo }) => {
    return formTwo;
  }),
  on(fromStepTwo.ResetStepTwoPayment, (state) => {
    return initFormStepTwoPayment;
  }),
);
