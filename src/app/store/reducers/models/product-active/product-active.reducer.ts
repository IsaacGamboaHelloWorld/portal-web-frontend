import { createReducer, on } from '@ngrx/store';

import * as product from '@store/actions/models/product-active/product-active.action';

export interface IProductActive {
  type?: string;
  id?: string;
  name?: string;
  bank_name?: string;
  bank?: string;
  dataComplete?: object;
}

export const initProductActive: IProductActive = null;

export const productActiveReducer = createReducer(
  initProductActive,
  on(product.SetSProductActive, (state, { productDetail }) => {
    return productDetail;
  }),
  on(product.ResetProductActive, (state) => {
    return initProductActive;
  }),
);
