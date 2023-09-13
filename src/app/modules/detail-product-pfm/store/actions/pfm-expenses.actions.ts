import { createAction, props } from '@ngrx/store';
import { PfmExpenseData } from '../../entities';

const enum TYPE_ACTIONS {
  LOAD = '[PFM Expenses] Load',
  FAIL = '[PFM Expenses] Fail',
  SUCCESS = '[PFM Expenses] Success',
  RESET = '[PFM Expenses] Reset',
}

export const expensesPfmLoad = createAction(
  TYPE_ACTIONS.LOAD,
  props<{ month: string; year: string; type2: string; product_type: string }>(),
);

export const expensesPfmSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ expenses: PfmExpenseData }>(),
);

export const expensesPfmFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const expensesPfmReset = createAction(TYPE_ACTIONS.RESET);
