import { createReducer, on } from '@ngrx/store';
import * as fromStepOne from '@store/actions/models/recharge/form-step-one.action';

import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';

export const initFormStepOneRecharge: IFormOneRecharge = {
  account_origin: null,
  operator: null,
  phone_number: null,
  amount: null,
};

export const formStepOneRechargeReducer = createReducer(
  initFormStepOneRecharge,
  on(fromStepOne.SetStepOneRecharge, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOneRecharge, (state) => {
    return initFormStepOneRecharge;
  }),
);
