import { createAction } from '@ngrx/store';

import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';

const enum TYPE_ACTIONS {
  SET_STEP = '[Recharge] Set Form One',
  RESET_STEP = '[Recharge] Reset Form One',
}

export const SetStepOneRecharge = createAction(
  TYPE_ACTIONS.SET_STEP,
  (formOne: IFormOneRecharge) => ({
    formOne,
  }),
);
export const ResetStepOneRecharge = createAction(TYPE_ACTIONS.RESET_STEP);
