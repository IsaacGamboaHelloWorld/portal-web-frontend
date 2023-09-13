import { createAction } from '@ngrx/store';

import { IProductActive } from '@store/reducers/models/product-active/product-active.reducer';

const enum TYPE_ACTIONS {
  SET_PRODUCT = '[Detail] Set Product Active',
  RESET_PRODUCT = '[Detail] Reset Product Active',
}

export const SetSProductActive = createAction(
  TYPE_ACTIONS.SET_PRODUCT,
  (productDetail: IProductActive) => ({
    productDetail,
  }),
);
export const ResetProductActive = createAction(TYPE_ACTIONS.RESET_PRODUCT);
