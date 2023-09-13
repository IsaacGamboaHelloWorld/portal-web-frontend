import { createAction, props } from '@ngrx/store';
import { PfmProductData } from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Detail Product] Load',
  FAIL = '[PFM Detail Product] Fail',
  SUCCESS = '[PFM Detail Product] Success',
  RESET = '[PFM Detail Product] Reset',
}

export const detailProductPfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ month: string; year: string }>(),
);

export const detailProductPfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ pfmProducts: PfmProductData }>(),
);

export const detailProductPfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const detailProductPfmReset = createAction(TYPE_ACTIONS.RESET);
