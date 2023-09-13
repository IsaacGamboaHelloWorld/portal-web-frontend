import { createAction, props } from '@ngrx/store';
import { ITributaryGmf } from '../../entities/tribubtary';

const enum TypeActions {
  LOAD = '[CREATE TRIBUTARY_GMF DS / API] Create tributary gmf Load',
  FAIL = '[CREATE TRIBUTARY_GMF DS / API] Create tributary gmf Fail',
  SUCCESS = '[CREATE TRIBUTARY_GMF DS / API] Create tributary gmf Success',
  RESET = '[CREATE TRIBUTARY_GMF DS / API] Create tributary gmf Reset',
}

export const TributaryGmfLoad = createAction(
  TypeActions.LOAD,
  props<{ year: string }>(),
);

export const TributaryGmfFail = createAction(
  TypeActions.FAIL,
  props<{ errorMessage: string }>(),
);

export const TributaryGmfSuccess = createAction(
  TypeActions.SUCCESS,
  props<{ tributary: ITributaryGmf }>(),
);

export const TributaryGmfReset = createAction(TypeActions.RESET);
