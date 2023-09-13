import { createReducer, on } from '@ngrx/store';
import { IProductAffiliationElement } from '../../entities/product-destination.interface';
import * as fromDestination from '../actions/product-destination.action';

export interface DestinationProductsState {
  products: IProductAffiliationElement[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initDestinationProducts: DestinationProductsState = {
  products: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
};

export const destinationProductsReducer = createReducer(
  initDestinationProducts,
  on(fromDestination.ProductDestinationLoad, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromDestination.ProductDestinationSuccess, (state, { products }) => {
    return {
      ...state,
      products,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromDestination.ProductDestinationError, (state, { errorMessage }) => {
    return {
      ...state,
      error: true,
      loading: false,
      loaded: false,
      errorMessage,
    };
  }),
  on(
    fromDestination.ProductDestinationReset,
    (state) => initDestinationProducts,
  ),
);
