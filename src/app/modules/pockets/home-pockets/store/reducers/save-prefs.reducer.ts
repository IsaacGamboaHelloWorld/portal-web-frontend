import { createReducer, on } from '@ngrx/store';

import { IPrefsResponse } from '../../entities/home-pockets';
import * as fromSave from '../actions/save-prefs.action';

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
  on(fromSave.SavePrefsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromSave.SavePrefsSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
    };
  }),
  on(fromSave.SavePrefsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromSave.SavePrefsReset, (state) => {
    return initSavePrefs;
  }),
);
