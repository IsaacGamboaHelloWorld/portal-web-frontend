import { createReducer, on } from '@ngrx/store';
import {
  UnusualApproveFailAction,
  UnusualApproveLoadAction,
  UnusualApproveResetAction,
  UnusualApproveSuccessAction,
} from '../actions/unusual-approve.actions';
import { IUnusualOpApprove } from '../state/unsual-operations.state';

export const initUnusualOPApprove: IUnusualOpApprove = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
};

export const unusualOpApproveReducers = createReducer(
  initUnusualOPApprove,
  on(UnusualApproveLoadAction, (state) => {
    return {
      ...state,
      data: null,
      loaded: false,
      loading: true,
    };
  }),
  on(UnusualApproveSuccessAction, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      success: true,
    };
  }),
  on(UnusualApproveFailAction, (state, { errorMessage }) => {
    return {
      ...state,
      data: null,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(UnusualApproveResetAction, (_state) => {
    return initUnusualOPApprove;
  }),
);
