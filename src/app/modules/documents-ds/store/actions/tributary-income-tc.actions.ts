import { IincomeTaxTC } from '@app/modules/documents/entities/documents';
import { createAction, props } from '@ngrx/store';

const enum TypeActionsIncomeTaxTC {
  LOAD = '[CREATE TRIBUTARY_INCOME_TC DS / API] Create tributary income_tc Load',
  FAIL = '[CREATE TRIBUTARY_INCOME_TC DS / API] Create tributary income_tc Fail',
  SUCCESS = '[CREATE TRIBUTARY_INCOME_TC DS / API] Create tributary income_tc Success',
  RESET = '[CREATE TRIBUTARY_INCOME_TC DS / API] Create tributary income_tc Reset',
}

export const TributaryIncomeTaxTCLoad = createAction(
  TypeActionsIncomeTaxTC.LOAD,
  props<{ year: string }>(),
);

export const TributaryIncomeTaxTCSuccess = createAction(
  TypeActionsIncomeTaxTC.SUCCESS,
  props<{ income: IincomeTaxTC }>(),
);

export const TributaryIncomeTaxTCFail = createAction(
  TypeActionsIncomeTaxTC.FAIL,
  props<{ errorMessage: string }>(),
);

export const TributaryIncomeTaxTCReset = createAction(
  TypeActionsIncomeTaxTC.RESET,
);
