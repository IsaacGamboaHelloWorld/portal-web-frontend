import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { createAction, props } from '@ngrx/store';

const enum TypeActionsExtracts {
  LOAD = '[CREATE EXTRACTS DS / API] Create extracts Load',
  FAIL = '[CREATE EXTRACTS DS / API] Create extracts Fail',
  SUCCESS = '[CREATE EXTRACTS DS / API] Create extracts Success',
  RESET = '[CREATE EXTRACTS DS / API] Create extracts Reset',
}

export const ExtractsLoad = createAction(
  TypeActionsExtracts.LOAD,
  props<{ account: string; accountType: string; period: IPeriodItem }>(),
);

export const ExtractsFail = createAction(
  TypeActionsExtracts.FAIL,
  props<{ errorMessage: string }>(),
);

export const ExtractsSuccess = createAction(
  TypeActionsExtracts.SUCCESS,
  props<{ pdfData: IPdfdata }>(),
);

export const ExtractsReset = createAction(TypeActionsExtracts.RESET);
