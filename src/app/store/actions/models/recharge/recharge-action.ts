import { createAction } from '@ngrx/store';

import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { IRespondRecharge } from '@modules/recharge-phone/entities/recharge';

const enum TYPE_ACTIONS {
  LOAD = '[Recharge] Load',
  FAIL = '[Recharge] Fail',
  SUCCESS = '[Recharge] Success',
  RESET = '[Recharge] Reset',
}

export const RechargeLoad = createAction(
  TYPE_ACTIONS.LOAD,
  (form: IFormOneRecharge) => ({
    form,
  }),
);
export const RechargeFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string, specificErrorCode: string = '') => ({
    description,
    specificErrorCode,
  }),
);
export const RechargeSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (form: IRespondRecharge) => ({ form }),
);
export const RechargeReset = createAction(TYPE_ACTIONS.RESET);
