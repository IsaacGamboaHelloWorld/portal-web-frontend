import { Product } from '@core/models/products/product';
import { createReducer, on } from '@ngrx/store';
import * as fromProduct from '@store/actions/models/product/product.action';

export const initProduct: Product[] = [];

export const productReducer = createReducer(
  initProduct,
  on(fromProduct.productLoad, (state, { typeAccount, id, product }) => {
    if (!findProduct(state, id, typeAccount)) {
      return [
        ...state,
        {
          ...product,
          id,
          typeAccount,
          loading: true,
          loaded: false,
          error: false,
          errorMessage: '',
        },
      ];
    }
    return [...state];
  }),
  on(fromProduct.productSuccess, (state, { typeAccount, id, product }) => {
    return state.map((data: Product) => {
      if (data.id === id && data.typeAccount === typeAccount) {
        return {
          ...data,
          ...product,
          loading: false,
          loaded: true,
          error: false,
          errorMessage: '',
        };
      } else {
        return data;
      }
    });
  }),
  on(fromProduct.productFail, (state, { typeAccount, id, errorMessage }) => {
    return state.map((product: Product) => {
      if (product.id === id && product.typeAccount === typeAccount) {
        return {
          ...product,
          loading: false,
          loaded: false,
          error: true,
          errorMessage,
        };
      } else {
        return product;
      }
    });
  }),
  on(fromProduct.detailProductLoad, (state, { typeAccount, id }) => {
    return state.map((product: Product) => {
      if (product.id === id && product.typeAccount === typeAccount) {
        return {
          ...product,
          loading: true,
          loaded: false,
          error: false,
          errorMessage: '',
        };
      } else {
        return product;
      }
    });
  }),
);

function findProduct(state: any[], id: string, typeAccount: string): boolean {
  return (
    state.filter(
      (data: Product) => data.id === id && data.typeAccount === typeAccount,
    ).length > 0
  );
}
