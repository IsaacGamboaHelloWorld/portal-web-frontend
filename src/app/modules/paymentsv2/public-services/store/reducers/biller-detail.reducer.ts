import { createReducer, on } from '@ngrx/store';
import { IBillerDetailResponse } from '../../payment/entities/new-payment';
import * as fromDetail from '../actions/biller-detail.action';

export interface BillerDetailState {
  data: IBillerDetailResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
  description: string;
}

export const initData: BillerDetailState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
  description: null,
};

export const billerDetailReducer = createReducer(
  initData,
  on(fromDetail.BillerDetailLoad, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromDetail.BillerDetailSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromDetail.BillerDetailFail, (state, { description }) => {
    return {
      ...state,
      error: true,
      loading: false,
      loaded: false,
      description,
    };
  }),
  on(fromDetail.BillerDetailReset, (state) => {
    return initData;
  }),
);
