import { createReducer, on } from '@ngrx/store';
import { IAlertFormThree } from '../../entities/alerts';
import * as fromStepThree from '../actions/formThree.action';

export const initFormStepThreeAlert: IAlertFormThree = {
  type_alert: null,
  target_user: null,
};

export const newAlertStepThreeReducer = createReducer(
  initFormStepThreeAlert,
  on(fromStepThree.SetStepThreeAlert, (state, { formThree }) => {
    return formThree;
  }),
  on(fromStepThree.ResetStepThreeAlert, (state) => {
    return initFormStepThreeAlert;
  }),
);
