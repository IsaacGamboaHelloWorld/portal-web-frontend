import { createReducer, on } from '@ngrx/store';

import { IDeletePocketResponse } from '../../entities/edit-pocket';
import * as fromDelete from '../actions/delete-pocket.action';

export interface IDeletePocket {
  data: IDeletePocketResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  request: object;
  rqUid: string;
}

export const initDeletePocket: IDeletePocket = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  request: null,
  rqUid: '',
};

export const deletePocketReducer = createReducer(
  initDeletePocket,
  on(fromDelete.DeletePocketLoad, (state) => {
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
  on(fromDelete.DeletePocketSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
      request: response.request,
      rqUid: response.rqUid,
    };
  }),
  on(fromDelete.DeletePocketFail, (state, { description }) => {
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
  on(fromDelete.DeletePocketReset, (state) => {
    return initDeletePocket;
  }),
);
