import { createAction, props } from '@ngrx/store';
import { ITributaryRetention } from '../../entities/tribubtary';

const enum TypeActionsRetention {
  LOAD = '[CREATE TRIBUTARY_RETENTION DS / API] Create tributary retention Load',
  FAIL = '[CREATE TRIBUTARY_RETENTION DS / API] Create tributary retention Fail',
  SUCCESS = '[CREATE TRIBUTARY_RETENTION DS / API] Create tributary retention Success',
  RESET = '[CREATE TRIBUTARY_RETENTION DS / API] Create tributary retention Reset',
}

export const TributaryRetentionLoad = createAction(
  TypeActionsRetention.LOAD,
  props<{ year: string }>(),
);

export const TributaryRetentionSuccess = createAction(
  TypeActionsRetention.SUCCESS,
  props<{ tributary: ITributaryRetention }>(),
);

export const TributaryRetentionFail = createAction(
  TypeActionsRetention.FAIL,
  props<{ errorMessage: string }>(),
);

export const TributaryRetentionReset = createAction(TypeActionsRetention.RESET);
