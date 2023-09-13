import { createReducer, on } from '@ngrx/store';
import { PfmProductData } from '../../entities/detail-product-pfm';
import {
  detailProductPfmLoad,
  detailProductPfmSuccess,
} from '../actions/product-detail-pfm.actions';
import {
  detailProductPfmFail,
  detailProductPfmReset,
} from './../actions/product-detail-pfm.actions';

export interface IPfmProductState {
  data: PfmProductData;
  success: boolean;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export const initPfmProduct: IPfmProductState = {
  data: null,
  success: true,
  loading: false,
  loaded: false,
  errorMessage: null,
};

export const productDetailPfmReducer = createReducer(
  initPfmProduct,
  on(detailProductPfmLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      success: false,
    };
  }),
  on(detailProductPfmSuccess, (state, { pfmProducts }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data: pfmProducts,
    };
  }),
  on(detailProductPfmFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
    };
  }),
  on(detailProductPfmReset, (state) => initPfmProduct),
);
