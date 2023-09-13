import { createReducer, on } from '@ngrx/store';

import { IToPlus } from '@modules/main-container/constants/to-plus';
import * as fromToPlus from '@store/actions/models/to-plus/to-plus.action';

export interface IToPlusState {
  data: IToPlus;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initToPlus: IToPlusState = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const toPlusReducer = createReducer(
  initToPlus,
  on(fromToPlus.ToPlusLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromToPlus.ToPlusSuccess, (state, { toPlus }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: toPlus,
    };
  }),
  on(fromToPlus.ToPlusFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
