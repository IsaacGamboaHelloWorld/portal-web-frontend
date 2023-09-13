import { createReducer, on } from '@ngrx/store';

import { IPrefsLoadResponse } from '../../entities/home-pockets';
import * as fromLoad from '../actions/load-prefs.action';

export interface ILoadPrefs {
  data: IPrefsLoadResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initLoadPrefs: ILoadPrefs = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const loadPrefReducer = createReducer(
  initLoadPrefs,
  on(fromLoad.LoadPrefsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromLoad.LoadPrefsSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
    };
  }),
  on(fromLoad.LoadPrefsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromLoad.LoadPrefsReset, (state) => {
    return initLoadPrefs;
  }),
);
