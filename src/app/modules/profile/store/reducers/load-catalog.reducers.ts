import { createReducer, on } from '@ngrx/store';
import { ICustomerProfileCatalog } from '../../entities/load-catalog';
import * as CustomerProfileCatalogActions from '../actions/load-catalog.actions';

export const initCustomerProfileCatalog: ICustomerProfileCatalog = {
  data: null,
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const customerProfileCatalogReducer = createReducer(
  initCustomerProfileCatalog,
  on(CustomerProfileCatalogActions.CustomerProfileCatalogLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(
    CustomerProfileCatalogActions.CustomerProfileCatalogSuccess,
    (state, { data }) => {
      return {
        data,
        success: data.success,
        error: false,
        loading: false,
        loaded: true,
      };
    },
  ),
  on(
    CustomerProfileCatalogActions.CustomerProfileCatalogFailed,
    (state, { description }) => {
      return {
        loaded: false,
        loading: false,
        error: true,
        errorMessage: description,
        ...state,
      };
    },
  ),
);
