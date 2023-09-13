import { createReducer, on } from '@ngrx/store';
import { IPendingTransfer } from '../../entities/pendingTransfer.interface';

import * as fromPending from '../actions/pending-transfer.action';

export interface IPendingTransferState {
  data: IPendingTransfer[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initPendingTransfer: IPendingTransferState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: '',
};

export const pendingTransferReducer = createReducer(
  initPendingTransfer,
  on(fromPending.PendingLoad, (state) => {
    return {
      ...state,
      error: false,
      loaded: false,
      loading: true,
    };
  }),
  on(fromPending.PendingSuccess, (state, { pending }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: pending,
      errorMessage: '',
    };
  }),
  on(fromPending.PendingFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
