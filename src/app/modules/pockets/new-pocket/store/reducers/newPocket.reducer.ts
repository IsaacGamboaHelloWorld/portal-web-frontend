import { createReducer, on } from '@ngrx/store';

import { IAnswerPocket } from '../../entities/new-pockets';
import * as fromNewPocket from '../actions/new-pocket.action';

export const initSavePocket: IAnswerPocket = {
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  request: null,
  rqUid: '',
};

export const savePocketReducer = createReducer(
  initSavePocket,
  on(fromNewPocket.CreatePocketLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      request: null,
      rqUid: '',
    };
  }),
  on(fromNewPocket.CreatePocketSuccess, (state, { data }) => {
    return {
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
      request: data.request,
      rqUid: data.rqUid,
    };
  }),
  on(fromNewPocket.CreatePocketFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      request: null,
      rqUid: '',
    };
  }),
  on(fromNewPocket.CreatePocketReset, (state) => {
    return initSavePocket;
  }),
);
