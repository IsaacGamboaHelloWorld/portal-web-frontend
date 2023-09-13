import { createReducer, on } from '@ngrx/store';
import { IResNewTransfer } from '../../entities/new-transfer.interface';
import {
  NewTransferActionFail,
  NewTransferActionLoad,
  NewTransferActionReset,
  NewTransferActionSuccess,
} from '../actions/new-transfer.actions';

export interface INewTransfer {
  data: IResNewTransfer;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  error: boolean;
}

export const initNewTransferReducer: INewTransfer = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
  specificErrorMessage: '',
  error: false,
};

export const NewTransferReducer = createReducer(
  initNewTransferReducer,
  on(NewTransferActionLoad, (state) => {
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
  on(NewTransferActionSuccess, (state, { data }) => {
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
  on(NewTransferActionFail, (state, { errorMessage, specificErrorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      error: true,
      errorMessage,
      specificErrorMessage,
    };
  }),
  on(NewTransferActionReset, (_state) => initNewTransferReducer),
);
