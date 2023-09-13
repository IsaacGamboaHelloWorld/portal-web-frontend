import { createReducer, on } from '@ngrx/store';
import { IPaymentFormThree } from '../../entities/new-payment';
import * as fromStepThree from '../actions/formThree.action';

export const initFormStepThreePayment: IPaymentFormThree = {
  date: null,
};

export const newPaymentStepThreeReducer = createReducer(
  initFormStepThreePayment,
  on(fromStepThree.SetStepThreePayment, (state, { formThree }) => {
    return formThree;
  }),
  on(fromStepThree.ResetStepThreePayment, (state) => {
    return initFormStepThreePayment;
  }),
);
