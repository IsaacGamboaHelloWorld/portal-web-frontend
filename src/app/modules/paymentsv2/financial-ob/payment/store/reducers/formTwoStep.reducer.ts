import { createReducer, on } from '@ngrx/store';
import { IPaymentFormTwo } from '../../entities/new-payment';
import * as fromStepTwo from '../actions/formTwo.action';

export const initFormStepTwoPayment: IPaymentFormTwo = {
  option_to_pay: null,
  amounttext: null,
  comments: null,
};

export const newPaymentStepTwoReducer = createReducer(
  initFormStepTwoPayment,
  on(fromStepTwo.SetStepTwoPayment, (state, { formTwo }) => {
    return formTwo;
  }),
  on(fromStepTwo.ResetStepTwoPayment, (state) => {
    return initFormStepTwoPayment;
  }),
);
