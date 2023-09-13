import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { createAction, props } from '@ngrx/store';

const enum TypeActionsPeriods {
  LOAD = '[CREATE EXTRACTS PERIODS DS / API] Create extracts periods Load',
  FAIL = '[CREATE EXTRACTS PERIODS DS / API] Create extracts periods Fail',
  SUCCESS = '[CREATE EXTRACTS PERIODS DS / API] Create extracts periods Success',
  RESET = '[CREATE EXTRACTS PERIODS DS / API] Create extracts periods Reset',
}

export const ExtractsPeriodsLoad = createAction(
  TypeActionsPeriods.LOAD,
  props<{ account: string; accountType: string }>(),
);

export const ExtractsPeriodsFail = createAction(
  TypeActionsPeriods.FAIL,
  props<{ errorMessage: string }>(),
);

export const ExtractsPeriodsSuccess = createAction(
  TypeActionsPeriods.SUCCESS,
  props<{ statement: IStatementDs }>(),
);

export const ExtractsPeriodsReset = createAction(TypeActionsPeriods.RESET);
