import { createAction } from '@ngrx/store';

import { IBlockProduct } from '@modules/blocked-products/entities/block-product';
import { IBlockProductResponse } from '@modules/blocked-products/entities/block-product-response';

const enum TYPE_ACTIONS {
  LOAD = '[Block Products] Load',
  FAIL = '[Block Products] Fail',
  SUCCESS = '[Block Products] Success',
  RESET = '[Block Products] Reset',
}

export const BlockProductLoad = createAction(
  TYPE_ACTIONS.LOAD,
  (request: IBlockProduct) => ({
    request,
  }),
);
export const BlockProductFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const BlockProductSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: IBlockProductResponse) => ({ data }),
);
export const BlockProductReset = createAction(TYPE_ACTIONS.RESET);
