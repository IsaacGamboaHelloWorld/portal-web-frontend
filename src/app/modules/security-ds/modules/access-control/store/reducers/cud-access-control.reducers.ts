import { createReducer, on } from '@ngrx/store';
import {
  CudAccessControlCreate,
  CudAccessControlDelete,
  CudAccessControlFail,
  CudAccessControlReset,
  CudAccessControlSuccess,
  CudAccessControlUpdate,
} from '../actions/cud-access-control.actions';
import { ICudChannel, IGenericChannel } from '../state/access-control.state';

export const initCudAccessControl: IGenericChannel<ICudChannel> = {
  data: null,
  loaded: true,
  loading: false,
  error: false,
  errorMessage: null,
};

export const CudAccessControlReducer = createReducer(
  initCudAccessControl,
  on(CudAccessControlCreate, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(CudAccessControlUpdate, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(CudAccessControlDelete, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(CudAccessControlSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      error: false,
      data,
    };
  }),
  on(CudAccessControlFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      error: true,
      errorMessage,
    };
  }),
  on(CudAccessControlReset, (_state) => initCudAccessControl),
);
