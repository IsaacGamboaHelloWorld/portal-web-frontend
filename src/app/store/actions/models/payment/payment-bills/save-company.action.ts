import { IActiveCompanySave } from '@core/interfaces/paymentBills.interface';
import { createAction } from '@ngrx/store';
import { IAgreementSaved } from '../../../../../core/interfaces/paymentBills.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Save] Companies Bill Load',
  SUCCESS = '[Save] Companies Bill Success',
  FAIL = '[Save] Companies Bill Fail',
  RESET = '[Save] Companies Bill reset',
}

export const SaveCompanyLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (biller: IActiveCompanySave) => ({
    biller,
  }),
);

export const SaveCompanyFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const SaveCompanySuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (service: IAgreementSaved) => ({ service }),
);

export const SaveCompanyResetAction = createAction(TYPE_ACTIONS.RESET);
