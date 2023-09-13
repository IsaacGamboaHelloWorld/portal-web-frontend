import { createReducer, on } from '@ngrx/store';

import { IHistoricTransfer } from '@modules/transfer-to-account/entities/historic';
import * as fromHistoric from '@store/actions/models/transfer/historic-transfer/historic-transfer.action.js';

export interface IHistoric {
  data: IHistoricTransfer[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initHistoricTransfer: IHistoric = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const historyTransferReducer = createReducer(
  initHistoricTransfer,
  on(fromHistoric.HistoricLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromHistoric.HistoricSuccess, (state, { history }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: history,
    };
  }),
  on(fromHistoric.HistoricFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
