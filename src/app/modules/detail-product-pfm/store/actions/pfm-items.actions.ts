import { createAction, props } from '@ngrx/store';
import { PfmItemCategory, PfmItemsRequest } from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Items] Load',
  FAIL = '[PFM Items] Fail',
  SUCCESS = '[PFM Items] Success',
  RESET = '[PFM Items] Reset',
}

export const itemsPfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ body: PfmItemsRequest }>(),
);

export const itemsPfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: PfmItemCategory[] }>(),
);

export const itemsPfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const itemsPfmReset = createAction(TYPE_ACTIONS.RESET);
