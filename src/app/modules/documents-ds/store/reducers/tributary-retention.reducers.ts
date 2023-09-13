import { createReducer, on } from '@ngrx/store';
import {
  TributaryRetentionFail,
  TributaryRetentionLoad,
  TributaryRetentionReset,
  TributaryRetentionSuccess,
} from '../actions/tributary-retention.actions';
import { ITributaryRetentionState } from '../state/documents.state';

export const initTributaryRetention: ITributaryRetentionState = {
  errorMessage: '',
  success: false,
  loaded: false,
  loading: false,
  fileUrl: '',
  base64: '',
  name: '',
};

export const TributaryRetentionReducer = createReducer(
  initTributaryRetention,
  on(TributaryRetentionLoad, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),
  on(TributaryRetentionSuccess, (state, { tributary }) => {
    return {
      ...state,
      success: true,
      errorMessage: null,
      loaded: true,
      loading: false,
      fileUrl: tributary.fileUrl,
      base64: tributary.base64,
      name: tributary.name,
    };
  }),
  on(TributaryRetentionFail, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
      loaded: true,
      loading: false,
    };
  }),
  on(TributaryRetentionReset, (state) => {
    return initTributaryRetention;
  }),
);
