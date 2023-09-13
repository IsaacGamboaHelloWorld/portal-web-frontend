import { createReducer, on } from '@ngrx/store';
import {
  LimitManagementCreateFailAction,
  LimitManagementCreateLoadAction,
  LimitManagementCreateResetAction,
  LimitManagementCreateSuccessAction,
} from '../actions';
import { ILimitManagementCreate } from '../state/limit-management.state';

export const initLimitManagementCreateState: ILimitManagementCreate = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
};

export const limitManagementCreateReducer = createReducer(
  initLimitManagementCreateState,
  on(LimitManagementCreateLoadAction, (_state) => ({
    ...initLimitManagementCreateState,
    loading: true,
  })),
  on(LimitManagementCreateSuccessAction, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    success: true,
    data,
  })),
  on(LimitManagementCreateFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    loaded: true,
    success: false,
    errorMessage,
  })),
  on(
    LimitManagementCreateResetAction,
    (_state) => initLimitManagementCreateState,
  ),
);
