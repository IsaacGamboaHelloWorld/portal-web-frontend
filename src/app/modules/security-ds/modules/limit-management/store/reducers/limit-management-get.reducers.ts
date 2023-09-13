import { createReducer, on } from '@ngrx/store';
import {
  LimitManagementGetFailAction,
  LimitManagementGetLoadAction,
  LimitManagementGetResetAction,
  LimitManagementGetSuccessAction,
} from '../actions';

import { ILimitManagementGet } from '../state/limit-management.state';

export const initLimitManagementGetState: ILimitManagementGet = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
};

export const limitManagementGetReducer = createReducer(
  initLimitManagementGetState,
  on(LimitManagementGetLoadAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(LimitManagementGetSuccessAction, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    success: true,
    data,
  })),
  on(LimitManagementGetFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    loaded: true,
    success: false,
    errorMessage,
  })),
  on(LimitManagementGetResetAction, (_state) => initLimitManagementGetState),
);
