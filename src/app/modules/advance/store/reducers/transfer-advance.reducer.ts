import { IAdvanceResp } from '@modules/advance/entities/advance';
import {
  fetchAdvanceFail,
  fetchAdvanceLoad,
  fetchAdvanceSuccess,
  setAdvanceReset,
} from '@modules/advance/store/actions/advance.action';
import { createReducer, on } from '@ngrx/store';

export interface ITransferAdvance {
  data: IAdvanceResp;
  loaded: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const initTransferAdvance: ITransferAdvance = {
  data: null,
  loaded: false,
  loading: false,
  error: false,
  errorMessage: null,
};

export const transferAdvanceReducer = createReducer(
  initTransferAdvance,
  on(fetchAdvanceLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: null,
    };
  }),
  on(fetchAdvanceSuccess, (state, { payload }) => {
    return {
      data: payload,
      loaded: true,
      loading: false,
      error: false,
      errorMessage: null,
    };
  }),
  on(fetchAdvanceFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage,
    };
  }),
  on(setAdvanceReset, (state) => initTransferAdvance),
);
