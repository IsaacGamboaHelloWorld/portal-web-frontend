import { createReducer, on } from '@ngrx/store';
import { NewTransfer } from '../../entities/new-transfer.interface';
import {
  FormNewTransferActionLoad,
  FormNewTransferActionReset,
  FormNewTransferActionSuccess,
} from '../actions/form-new-transfer.actions';

export interface IFormNewTransfer {
  data: NewTransfer;
}

export const initFormNewTransferReducer: IFormNewTransfer = {
  data: null,
};

export const FormNewTransferReducer = createReducer(
  initFormNewTransferReducer,
  on(FormNewTransferActionLoad, (state, { FormNewTransfer }) => {
    return {
      ...state,
      data: FormNewTransfer,
    };
  }),
  on(FormNewTransferActionSuccess, (state, { data }) => {
    return {
      ...state,
      data,
    };
  }),
  on(FormNewTransferActionReset, (_state) => initFormNewTransferReducer),
);
