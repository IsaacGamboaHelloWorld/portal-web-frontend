import { createAction, props } from '@ngrx/store';
import { IPfmCreditCardData } from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Credit Cards] Load',
  FAIL = '[PFM Credit Cards] Fail',
  SUCCESS = '[PFM Credit Cards] Success',
  RESET = '[PFM Credit Cards] Reset',
}

export const creditCardsPfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ month: string; year: string }>(),
);

export const creditCardsPfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: IPfmCreditCardData }>(),
);

export const creditCardsPfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const creditCardsPfmReset = createAction(TYPE_ACTIONS.RESET);
