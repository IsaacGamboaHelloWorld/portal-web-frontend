import { createReducer, on } from '@ngrx/store';

import { IHomePocketAccount } from '../../entities/home-pockets';
import * as fromHome from '../actions/get-pockets.action';

export interface IHomePockets {
  data: IHomePocketAccount[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initHomePockets: IHomePockets = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const homePocketsReducer = createReducer(
  initHomePockets,
  on(fromHome.HomePocketsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromHome.HomePocketsSuccess, (state, { pockets }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: pockets,
      errorMessage: '',
    };
  }),
  on(fromHome.HomePocketsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromHome.HomePocketsReset, (state) => {
    return initHomePockets;
  }),
);
