import { createReducer, on } from '@ngrx/store';

import { IPrefsLoadResponse, IPrefsResponse } from '../../entities/news';
import * as fromPrefs from '../actions/news.actions';

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
  on(fromPrefs.LoadPrefsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromPrefs.LoadPrefsSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
    };
  }),
  on(fromPrefs.LoadPrefsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromPrefs.LoadPrefsReset, (state) => {
    return initLoadPrefs;
  }),
);

export interface ISavePrefs {
  data: IPrefsResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initSavePrefs: ISavePrefs = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const savePrefReducer = createReducer(
  initSavePrefs,
  on(fromPrefs.SavePrefsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromPrefs.SavePrefsSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
    };
  }),
  on(fromPrefs.SavePrefsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromPrefs.SavePrefsReset, (state) => {
    return initSavePrefs;
  }),
);
