import { createAction } from '@ngrx/store';

import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';

export const ProductDestinationLoad = createAction(
  '[Transfer / API] Products Destination Load',
  (accountId: string, accountType: string) => ({ accountId, accountType }),
);
export const ProductDestinationSuccess = createAction(
  '[Transfer / API] Products Destination Success',
  (products: IProductAffiliationElement[]) => ({ products }),
);
export const ProductDestinationError = createAction(
  '[Transfer / API] Products Destination Fail',
  (errorMessage: string) => ({ errorMessage }),
);
export const ProductDestinationReset = createAction(
  '[Transfer] Products Destination reset',
);
