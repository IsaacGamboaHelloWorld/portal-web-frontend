import { createReducer, on } from '@ngrx/store';
import { IAlertFormOne } from '../../entities/alerts';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOneAlert: IAlertFormOne = {
  type_prod: null,
};

export const newAlertStepOneReducer = createReducer(
  initFormStepOneAlert,
  on(fromStepOne.SetStepOneAlert, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOneAlert, (state) => {
    return initFormStepOneAlert;
  }),
);
