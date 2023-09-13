import { createAction, props } from '@ngrx/store';
import {
  IResNewTransfer,
  NewTransfer,
} from '../../entities/new-transfer.interface';

const enum TypeActionsNewTransfer {
  LOAD = '[NEW_TRASFER / API] NewTransfer Load',
  FAIL = '[NEW_TRASFER / API] NewTransfer Fail',
  SUCCESS = '[NEW_TRASFER / API] NewTransfer Success',
  RESET = '[NEW_TRASFER / API] NewTransfer Reset',
}

export const NewTransferActionLoad = createAction(
  TypeActionsNewTransfer.LOAD,
  props<{
    newTransfer: NewTransfer;
  }>(),
);

export const NewTransferActionSuccess = createAction(
  TypeActionsNewTransfer.SUCCESS,
  props<{ data: IResNewTransfer }>(),
);

export const NewTransferActionFail = createAction(
  TypeActionsNewTransfer.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage?: string;
  }>(),
);

export const NewTransferActionReset = createAction(
  TypeActionsNewTransfer.RESET,
);
