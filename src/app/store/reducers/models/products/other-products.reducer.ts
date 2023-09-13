import * as fromOtherProducts from '@store/actions/models/products/other-products.action';

import { ProductsInterface } from '@core/interfaces/products.interface';
import { createReducer, on } from '@ngrx/store';

export interface OtherProduct {
  key: string;
  products: ProductsInterface;
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export const initOtherProducts: OtherProduct[] = [];

export const otherProductReducer = createReducer(
  initOtherProducts,
  on(fromOtherProducts.otherProductLoad, (state, { nameBank }) => {
    if (!findProduct(state, nameBank)) {
      return [
        ...state,
        {
          key: nameBank,
          loading: true,
          loaded: false,
          error: false,
          errorMessage: '',
        },
      ];
    } else {
      return state.map((data: OtherProduct) => {
        if (data.key === nameBank) {
          return {
            ...data,
            loading: true,
            loaded: false,
            error: false,
            errorMessage: '',
          };
        } else {
          return data;
        }
      });
    }
  }),
  on(fromOtherProducts.otherProductSuccess, (state, { products, nameBank }) => {
    return state.map((data: OtherProduct) => {
      if (data.key === nameBank) {
        return {
          ...data,
          products,
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
  on(
    fromOtherProducts.otherProductFail,
    (state, { nameBank, errorMessage }) => {
      return state.map((data: OtherProduct) => {
        if (data.key === nameBank) {
          return {
            ...data,
            loading: false,
            loaded: false,
            error: true,
            errorMessage,
          };
        } else {
          return data;
        }
      });
    },
  ),
);

export const otherProductShowReducer = createReducer(
  false,
  on(fromOtherProducts.otherProductShow, (state, { show }) => {
    return show;
  }),
);

function findProduct(state: any[], bank: string): boolean {
  return state.filter((data: OtherProduct) => data.key === bank).length > 0;
}
