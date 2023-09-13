import {
  IProductAffiliationElement,
  OriginAccountRegistrationProduct,
} from '@core/interfaces/product-destination.interface';
import { createAction } from '@ngrx/store';

export const LoadRegisterAffiliationApiOperation = createAction(
  '[Affiliation Product / API] Load Register Affiliation',
  (
    affiliationProduct: IProductAffiliationElement,
    products: OriginAccountRegistrationProduct[],
  ) => ({
    affiliationProduct,
    products,
  }),
);

export const RegisterAffiliationSuccess = createAction(
  '[Affiliation Product / API] success Register Affiliation',
);

export const RegisterAffiliationError = createAction(
  '[Affiliation Product / API] Error Register Affiliation',
  (errorMessage: string) => ({
    errorMessage,
  }),
);

export const ResetRegisterAffiliation = createAction(
  '[Affiliation Product / API] Reset Register Affiliation',
);
