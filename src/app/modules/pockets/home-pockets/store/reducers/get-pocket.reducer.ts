import { createReducer, on } from '@ngrx/store';

import { IHomePocketAccount } from '../../entities/home-pockets';
import * as fromDetail from '../actions/get-pocket.action';

export interface IHomePocket {
  data: IHomePocketAccount[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initHomePocket: IHomePocket = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const detailPocketReducer = createReducer(
  initHomePocket,
  on(fromDetail.DetailPocketLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromDetail.DetailPocketSuccess, (state, { pocket }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: pocket,
      errorMessage: '',
    };
  }),
  on(fromDetail.DetailPockesFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
);
