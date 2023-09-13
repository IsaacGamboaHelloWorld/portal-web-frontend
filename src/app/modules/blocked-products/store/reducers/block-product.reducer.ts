import * as BlockProductActions from '@app/modules/blocked-products/store/actions/block-product.action';
import { createReducer, on } from '@ngrx/store';
import { BlockProductStateData } from './../../entities/block-product-response';

export const initBlockProduct: BlockProductStateData = {
  data: null,
  request: null,
  success: false,
  loading: false,
  loaded: false,
  error: false,
};

export const blockProductReducer = createReducer(
  initBlockProduct,
  on(BlockProductActions.BlockProductLoad, (state, { request }) => {
    return {
      ...state,
      request,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(BlockProductActions.BlockProductSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(BlockProductActions.BlockProductFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
  on(BlockProductActions.BlockProductReset, (state) => {
    return initBlockProduct;
  }),
);
