import { createAction, props } from '@ngrx/store';
import {
  PfmRecategorizeRequest,
  PfmRecategorizeResponse,
} from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Recategorize] Load',
  FAIL = '[PFM Recategorize] Fail',
  SUCCESS = '[PFM Recategorize] Success',
  RESET = '[PFM Recategorize] Reset',
}

export const recategorizePfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ body: PfmRecategorizeRequest }>(),
);

export const recategorizePfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: boolean }>(),
);
export const recategorizePfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string; specificErrorMessage: string }>(),
);

export const recategorizePfmReset = createAction(TYPE_ACTIONS.RESET);
