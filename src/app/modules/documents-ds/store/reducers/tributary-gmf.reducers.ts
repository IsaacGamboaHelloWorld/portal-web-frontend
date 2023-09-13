import { createReducer, on } from '@ngrx/store';
import {
  TributaryGmfFail,
  TributaryGmfLoad,
  TributaryGmfReset,
  TributaryGmfSuccess,
} from '../actions/tributary-gmf.actions';
import { ITributaryGmfState } from './../state/documents.state';

export const initGmf: ITributaryGmfState = {
  errorMessage: '',
  success: false,
  loaded: false,
  loading: false,
  fileUrl: '',
  base64: '',
  name: '',
};

export const TributaryGmfReducer = createReducer(
  initGmf,
  on(TributaryGmfLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
      loaded: false,
      loading: true,
    };
  }),
  on(TributaryGmfSuccess, (state, { tributary }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: true,
      fileUrl: tributary.fileUrl,
      base64: tributary.base64,
      name: tributary.name,
      errorMessage: null,
    };
  }),
  on(TributaryGmfFail, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      loaded: true,
      loading: false,
      success: false,
      fileUrl: '',
      base64: '',
      name: '',
    };
  }),
  on(TributaryGmfReset, (state) => {
    return initGmf;
  }),
);
