import { createReducer, on } from '@ngrx/store';
import {
  GetAccessControlFail,
  GetAccessControlLoad,
  GetAccessControlReset,
  GetAccessControlSuccess,
} from '../actions/get-access-control.actions';
import { IDataChannel, IGenericChannel } from '../state/access-control.state';

export const initAccessControl: IGenericChannel<IDataChannel> = {
  data: null,
  loaded: true,
  loading: false,
  error: false,
  errorMessage: null,
};

export const GetAccessControlReducer = createReducer(
  initAccessControl,
  on(GetAccessControlLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(GetAccessControlSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      error: false,
      data,
    };
  }),
  on(GetAccessControlFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      error: true,
      errorMessage,
    };
  }),
  on(GetAccessControlReset, (_state) => initAccessControl),
);
