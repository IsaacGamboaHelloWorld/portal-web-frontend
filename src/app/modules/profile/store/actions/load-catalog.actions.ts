import { createAction } from '@ngrx/store';
import { CustomerProfileCatalog } from '../../entities/load-catalog';

const enum TypeActions {
  LOAD = '[CREATE CUSTOMER_PROFILE_CATALOG / API] Create customer_profile_catalog Load',
  FAIL = '[CREATE CUSTOMER_PROFILE_CATALOG / API] Create customer_profile_catalog Fail',
  SUCCESS = '[CREATE CUSTOMER_PROFILE_CATALOG / API] Create customer_profile_catalog Success',
  RESET = '[CREATE CUSTOMER_PROFILE_CATALOG / API] Create customer_profile_catalog Reset',
}

export const CustomerProfileCatalogLoad = createAction(TypeActions.LOAD);

export const CustomerProfileCatalogFailed = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CustomerProfileCatalogSuccess = createAction(
  TypeActions.SUCCESS,
  (data: CustomerProfileCatalog) => ({ data }),
);

export const CustomerProfileCatalogReset = createAction(TypeActions.RESET);
