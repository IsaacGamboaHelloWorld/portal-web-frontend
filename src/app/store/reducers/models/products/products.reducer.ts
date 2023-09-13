import * as fromProducts from '@store/actions/models/products/products.action';

import { ProductsInterface } from '@core/interfaces/products.interface';
import { createReducer, on } from '@ngrx/store';

export interface ProductsState {
  types_account: ProductsInterface;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initProducts: ProductsState = {
  types_account: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: '',
};

export const productsReducer = createReducer(
  initProducts,
  on(fromProducts.productsLoad, (state) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromProducts.productsSuccess, (state, { products }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      types_account: products,
    };
  }),
  on(fromProducts.productsFail, (state, { errorMessage }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
      errorMessage,
    };
  }),
);
