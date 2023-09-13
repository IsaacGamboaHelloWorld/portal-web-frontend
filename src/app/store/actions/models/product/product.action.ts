import { createAction } from '@ngrx/store';

import { Product } from '@core/models/products/product';

export const productLoad = createAction(
  '[Home] Load Product',
  (typeAccount: string, id: string, product: Product) => ({
    typeAccount,
    id,
    product,
  }),
);
export const detailProductLoad = createAction(
  '[Detail] Load Product',
  (typeAccount: string, id: string) => ({
    typeAccount,
    id,
  }),
);
export const productSuccess = createAction(
  '[Home] Success Product',
  (typeAccount: string, id: string, product: Product) => ({
    typeAccount,
    id,
    product,
  }),
);
export const productFail = createAction(
  '[Home] Fail Product',
  (typeAccount: string, id: string, errorMessage: string) => ({
    typeAccount,
    id,
    errorMessage,
  }),
);
