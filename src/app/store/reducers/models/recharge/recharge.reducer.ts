import { IRespondRecharge } from '@app/modules/recharge-phone/entities/recharge';
import { createReducer, on } from '@ngrx/store';

import * as fromRecharge from '@store/actions/models/recharge/recharge-action';

export interface IRecharge {
  data: IRespondRecharge;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  specificErrorCode: string;
}

export const initRecharge: IRecharge = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  specificErrorCode: null,
};

export const rechargeReducer = createReducer(
  initRecharge,
  on(fromRecharge.RechargeLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorCode: null,
    };
  }),

  on(fromRecharge.RechargeSuccess, (state, { form }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: form,
    };
  }),
  on(fromRecharge.RechargeFail, (state, { description, specificErrorCode }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      specificErrorCode,
    };
  }),
  on(fromRecharge.RechargeReset, (state) => {
    return initRecharge;
  }),
);
