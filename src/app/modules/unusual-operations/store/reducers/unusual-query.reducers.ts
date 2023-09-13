import { createReducer, on } from '@ngrx/store';
import {
  UnusualQueryFailAction,
  UnusualQueryLoadAction,
  UnusualQueryResetAction,
  UnusualQuerySuccessAction,
} from '../actions/unusual-query.actions';
import { IUnusualOpQuery } from '../state/unsual-operations.state';

export const initUnusualOPQuery: IUnusualOpQuery = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
};

export const unusualOpQueryReducers = createReducer(
  initUnusualOPQuery,
  on(UnusualQueryLoadAction, (state) => {
    return {
      ...state,
      data: null,
      loaded: false,
      loading: true,
    };
  }),
  on(UnusualQuerySuccessAction, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      success: true,
    };
  }),
  on(UnusualQueryFailAction, (state, { errorMessage }) => {
    return {
      ...state,
      data: null,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(UnusualQueryResetAction, (_state) => {
    return initUnusualOPQuery;
  }),
);
