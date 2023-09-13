import { createAction } from '@ngrx/store';
import { ITaxes } from '../../entities/payment-taxes';

const enum TypeActions {
  LOAD = '[CREATE TAXES / API] Create taxes Load taxes',
  FAIL = '[CREATE TAXES / API] Create taxes Fail taxes',
  SUCCESS = '[CREATE TAXES / API] Create taxes Success taxes',
  RESET = '[CREATE TAXES / API] Create reference Reset TAXES',
}

export const TaxesLoad = createAction(TypeActions.LOAD, (idCity: string) => ({
  idCity,
}));

export const TaxesFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const TaxesSuccess = createAction(
  TypeActions.SUCCESS,
  (data: ITaxes) => ({ data }),
);
export const TaxesReset = createAction(TypeActions.RESET);
