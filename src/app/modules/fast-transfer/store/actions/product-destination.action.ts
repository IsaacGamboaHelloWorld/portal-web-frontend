import { createAction } from '@ngrx/store';
import { IProductAffiliationElement } from '../../entities/product-destination.interface';

export const ProductDestinationLoad = createAction(
  '[FastTransfer Transfer / API] Products Destination Load',
  (accountId: string, accountType: string) => ({ accountId, accountType }),
);
export const ProductDestinationSuccess = createAction(
  '[FastTransfer Transfer / API] Products Destination Success',
  (products: IProductAffiliationElement[]) => ({ products }),
);
export const ProductDestinationError = createAction(
  '[FastTransfer Transfer / API] Products Destination Fail',
  (errorMessage: string) => ({ errorMessage }),
);
export const ProductDestinationReset = createAction(
  '[FastTransfer Transfer] Products Destination reset',
);
