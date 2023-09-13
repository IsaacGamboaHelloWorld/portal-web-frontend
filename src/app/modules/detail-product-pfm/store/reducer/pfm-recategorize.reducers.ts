import { IGenericState } from '@app/core/interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  recategorizePfmFail,
  recategorizePfmLoad,
  recategorizePfmReset,
  recategorizePfmSuccess,
} from '../actions';

export interface IPfmRecategorizeState extends IGenericState {
  specificErrorMessage: string;
  data: boolean;
}

export const initPfmRecategorize: IPfmRecategorizeState = {
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
  specificErrorMessage: null,
  data: null,
};

export const pfmRecategorizeReducer = createReducer(
  initPfmRecategorize,
  on(recategorizePfmLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      specificErrorMessage: '',
      success: false,
    };
  }),
  on(recategorizePfmSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data,
    };
  }),
  on(recategorizePfmFail, (state, { errorMessage, specificErrorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
      specificErrorMessage,
    };
  }),
  on(recategorizePfmReset, (_state) => initPfmRecategorize),
);
