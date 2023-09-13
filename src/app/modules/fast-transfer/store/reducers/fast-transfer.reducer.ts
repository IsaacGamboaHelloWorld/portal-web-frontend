import { createReducer, on } from '@ngrx/store';
import { IResFastTransfer } from '../../entities/fast-transfer.interface';
import {
  FastTransferActionFail,
  FastTransferActionLoad,
  FastTransferActionReset,
  FastTransferActionSuccess,
} from '../actions/fast-transfer.actions';

export interface IFastTransfer {
  data: IResFastTransfer;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  error: boolean;
}

export const initFastTransferReducer: IFastTransfer = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
  specificErrorMessage: '',
  error: false,
};

export const FastTransferReducer = createReducer(
  initFastTransferReducer,
  on(FastTransferActionLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorMessage: '',
      data: null,
    };
  }),
  on(FastTransferActionSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      specificErrorMessage: null,
      error: false,
      success: true,
      data,
    };
  }),
  on(
    FastTransferActionFail,
    (state, { errorMessage, specificErrorMessage }) => {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: true,
        errorMessage,
        specificErrorMessage,
      };
    },
  ),
  on(FastTransferActionReset, (_state) => initFastTransferReducer),
);
