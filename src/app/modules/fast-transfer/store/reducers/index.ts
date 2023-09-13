import { combineReducers } from '@ngrx/store';
import { FastTransferReducer as FastTransfer } from './fast-transfer.reducer';
import { FastTransferStateReducers as step } from './step.reducer';

export const FastTransferRootReducer = combineReducers({
  step,
  FastTransfer,
});
