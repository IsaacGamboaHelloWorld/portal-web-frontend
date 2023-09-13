import { createAction, props } from '@ngrx/store';
import { PfmMovementData, PfmMovimentRequest } from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Moviments] Load',
  FAIL = '[PFM Moviments] Fail',
  SUCCESS = '[PFM Moviments] Success',
  RESET = '[PFM Moviments] Reset',
}

export const movimentsPfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ body: PfmMovimentRequest }>(),
);

export const movimentsPfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: PfmMovementData }>(),
);

export const movimentsPfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const movimentsPfmReset = createAction(TYPE_ACTIONS.RESET);
