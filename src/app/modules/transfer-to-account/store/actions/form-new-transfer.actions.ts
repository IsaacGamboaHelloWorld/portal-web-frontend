import { createAction, props } from '@ngrx/store';
import {
  IResNewTransfer,
  NewTransfer,
} from '../../entities/new-transfer.interface';

const enum TypeActionsFormNewTransfer {
  LOAD = '[FORM_NEW_TRASFER / API] FormNewTransfer Load',
  SUCCESS = '[FORM_NEW_TRASFER / API] FormNewTransfer Success',
  RESET = '[FORM_NEW_TRASFER / API] FormNewTransfer Reset',
}

export const FormNewTransferActionLoad = createAction(
  TypeActionsFormNewTransfer.LOAD,
  props<{
    FormNewTransfer: NewTransfer;
  }>(),
);
export const FormNewTransferActionSuccess = createAction(
  TypeActionsFormNewTransfer.SUCCESS,
  props<{ data: NewTransfer }>(),
);
export const FormNewTransferActionReset = createAction(
  TypeActionsFormNewTransfer.RESET,
);
