import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatement } from '@app/core/interfaces/statement/statement';
import { createAction } from '@ngrx/store';

const enum TypeActionsPeriods {
  LOAD = '[CREATE EXTRACTS PERIODS / API] Create extracts periods Load',
  FAIL = '[CREATE EXTRACTS PERIODS / API] Create extracts periods Fail',
  SUCCESS = '[CREATE EXTRACTS PERIODS / API] Create extracts periods Success',
  RESET = '[CREATE EXTRACTS PERIODS / API] Create extracts periods Reset',
}

const enum TypeActionsExtracts {
  LOAD = '[CREATE EXTRACTS / API] Create extracts Load',
  FAIL = '[CREATE EXTRACTS / API] Create extracts Fail',
  SUCCESS = '[CREATE EXTRACTS / API] Create extracts Success',
  RESET = '[CREATE EXTRACTS / API] Create extracts Reset',
}

export const ExtractsPeriodsLoad = createAction(
  TypeActionsPeriods.LOAD,
  (account: string, accountType: string) => ({ account, accountType }),
);

export const ExtractsPeriodsFail = createAction(
  TypeActionsPeriods.FAIL,
  (data: string) => ({
    data,
  }),
);
export const ExtractsPeriodsSuccess = createAction(
  TypeActionsPeriods.SUCCESS,
  (data: IStatement) => ({ data }),
);

export const ExtractsPeriodsReset = createAction(TypeActionsPeriods.RESET);

export const ExtractsLoad = createAction(
  TypeActionsExtracts.LOAD,
  (account: string, accountType: string, data: IPeriodItem) => ({
    account,
    accountType,
    data,
  }),
);

export const ExtractsFail = createAction(
  TypeActionsExtracts.FAIL,
  (data: string) => ({
    data,
  }),
);
export const ExtractsSuccess = createAction(
  TypeActionsExtracts.SUCCESS,
  (data: IPdfdata) => ({ data }),
);

export const ExtractsReset = createAction(TypeActionsExtracts.RESET);
