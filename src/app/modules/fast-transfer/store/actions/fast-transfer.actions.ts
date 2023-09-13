import { createAction, props } from '@ngrx/store';
import {
  FastTransfer,
  IResFastTransfer,
} from '../../entities/fast-transfer.interface';

const enum TypeActionsFastTransfer {
  LOAD = '[FAST_TRASFER / API] FastTransfer Load',
  FAIL = '[FAST_TRASFER / API] FastTransfer Fail',
  SUCCESS = '[FAST_TRASFER / API] FastTransfer Success',
  RESET = '[FAST_TRASFER / API] FastTransfer Reset',
}

export const FastTransferActionLoad = createAction(
  TypeActionsFastTransfer.LOAD,
  props<{
    fastTransfer: FastTransfer;
  }>(),
);

export const FastTransferActionSuccess = createAction(
  TypeActionsFastTransfer.SUCCESS,
  props<{ data: IResFastTransfer }>(),
);

export const FastTransferActionFail = createAction(
  TypeActionsFastTransfer.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage?: string;
  }>(),
);

export const FastTransferActionReset = createAction(
  TypeActionsFastTransfer.RESET,
);
