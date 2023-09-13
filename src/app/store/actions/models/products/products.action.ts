import { createAction } from '@ngrx/store';

import { ProductsInterface } from '@core/interfaces/products.interface';

export const productsLoad = createAction('[Products Home] Products Load');
export const productsCancel = createAction('[Products Home] Products Cancel');
export const productsSuccess = createAction(
  '[Products Home] Products Success',
  (products: ProductsInterface) => ({ products }),
);
export const productsFail = createAction(
  '[Products Home] Products Fail',
  (errorMessage: string) => ({ errorMessage }),
);
