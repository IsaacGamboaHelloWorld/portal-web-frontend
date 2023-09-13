import { createAction } from '@ngrx/store';

import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';
import { Product } from '@core/models/products/product';

export const DeleteAffiliationLoad = createAction(
  '[Transfer / API] Load Delete Affiliation',
  (affiliationProduct: IProductAffiliationElement, product: Product) => ({
    affiliationProduct,
    product,
  }),
);

export const DeleteAffiliationSuccess = createAction(
  '[Transfer / API] success Delete Affiliation',
);

export const DeleteAffiliationError = createAction(
  '[Transfer / API] Error Delete Affiliation',
);
