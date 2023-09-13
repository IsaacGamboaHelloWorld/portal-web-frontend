import { CompanyListInterface } from '@core/interfaces/paymentBills.interface';
import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[Searched] Companies Bill Load',
  SUCCESS = '[Searched] Companies Bill Success',
  FAIL = '[Searched] Companies Bill Fail',
  RESET = '[Searched] Companies Bill reset',
}

export const CompaniesBillLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (dataSend: string) => ({
    dataSend,
  }),
);

export const CompaniesBillFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const CompaniesBillSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (companies: CompanyListInterface) => ({ companies }),
);

export const CompaniesBillResetAction = createAction(TYPE_ACTIONS.RESET);
