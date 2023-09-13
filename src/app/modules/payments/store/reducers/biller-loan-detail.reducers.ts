import { createReducer, on } from '@ngrx/store';
import { IAnswerBillerLoanDetail } from '../../entities/biller-loan-detail';
import * as fromDestination from '../actions/biller-loan-detail.actions';

export interface BillerLoanDetailState {
  data: IAnswerBillerLoanDetail;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initData: BillerLoanDetailState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
};

export const billerLoanDetailReducer = createReducer(
  initData,
  on(fromDestination.BillerLoanDetailLoad, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromDestination.BillerLoanDetailSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromDestination.BillerLoanDetailFail, (state, { description }) => {
    return {
      ...state,
      error: true,
      loading: false,
      loaded: false,
      description,
    };
  }),
  on(fromDestination.BillerLoanDetailReset, (state) => {
    return initData;
  }),
);
