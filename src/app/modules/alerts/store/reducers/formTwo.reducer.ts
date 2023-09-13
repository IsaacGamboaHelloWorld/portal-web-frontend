import { createReducer, on } from '@ngrx/store';
import { IAlertFormTwo } from '../../entities/alerts';
import * as fromStepTwo from '../actions/formTwo.action';

export const initFormStepTwoAlert: IAlertFormTwo = {
  select_product: null,
};

export const newAlertStepTwoReducer = createReducer(
  initFormStepTwoAlert,
  on(fromStepTwo.SetStepTwoAlert, (state, { formTwo }) => {
    return formTwo;
  }),
  on(fromStepTwo.ResetStepTwoAlert, (state) => {
    return initFormStepTwoAlert;
  }),
);
