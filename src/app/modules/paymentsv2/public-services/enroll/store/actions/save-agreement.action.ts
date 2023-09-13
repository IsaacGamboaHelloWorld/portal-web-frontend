import { IActiveCompanySave } from '@core/interfaces/paymentBills.interface';
import { createAction } from '@ngrx/store';
import { IAgreementSaved } from '../../entities/enroll';

const enum TYPE_ACTIONS {
  LOAD = '[Enroll] Enroll Bill Load',
  SUCCESS = '[Enroll] Enroll Bill Success',
  FAIL = '[Enroll] Enroll Bill Fail',
  RESET = '[Enroll] Enroll Bill reset',
}

export const EnrollLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (biller: IActiveCompanySave) => ({
    biller,
  }),
);

export const EnrollFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const EnrollSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (service: IAgreementSaved) => ({ service }),
);

export const EnrollResetAction = createAction(TYPE_ACTIONS.RESET);
