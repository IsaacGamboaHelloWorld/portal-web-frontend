import { Product } from '@app/core/models/products/product';
import { createAction, props } from '@ngrx/store';
import { optionTabsEnum } from '../../constans/tabs-options.enum';
import { IDatePfm } from '../../entities';

const enum TYPE_ACTIONS {
  TAB_SELECTED = '[PFM Navigate] Tab Selected',
  TAB_SELECTED_RESET = '[PFM Navigate] Tab Selected Reset',
  DATE_SELECTED = '[PFM Navigate] Date Selected',
  DATE_SELECTED_RESET = '[PFM Navigate] Date Selected reset',
  PRODUCT_SELECTED = '[PFM Navigate] Year Selected',
  PRODUCT_SELECTED_RESET = '[PFM Navigate] Date Selected reset',
  IS_FIRST_TIME = '[PFM Navigate] IS FIRST TIME',
}

export const pfmTabSelected = createAction(
  TYPE_ACTIONS.TAB_SELECTED,
  props<{ tab: optionTabsEnum }>(),
);

export const pfmDateSelected = createAction(
  TYPE_ACTIONS.DATE_SELECTED,
  props<{ date: IDatePfm }>(),
);

export const pfmProductSelected = createAction(
  TYPE_ACTIONS.PRODUCT_SELECTED,
  props<{ product: Product }>(),
);

export const pfmTabSelectedReset = createAction(
  TYPE_ACTIONS.TAB_SELECTED_RESET,
);
export const pfmProductSelectedReset = createAction(
  TYPE_ACTIONS.PRODUCT_SELECTED_RESET,
);
export const pfmDateSelectedReset = createAction(
  TYPE_ACTIONS.DATE_SELECTED_RESET,
);
export const pfmIsFirstTime = createAction(
  TYPE_ACTIONS.IS_FIRST_TIME,
  props<{ value: boolean }>(),
);
