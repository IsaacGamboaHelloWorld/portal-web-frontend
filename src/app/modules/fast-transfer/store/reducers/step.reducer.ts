import { createReducer, on } from '@ngrx/store';
import { IStepFastTransfer } from '../../entities/fast-transfer.interface';
import {
  ResetStepFastTransfer,
  SetStepFastTransfer,
} from '../actions/step.actions';

export const initStepFastTransfer: IStepFastTransfer = {
  step: 1,
};

export const FastTransferStateReducers = createReducer(
  initStepFastTransfer,
  on(SetStepFastTransfer, (state, { step }) => {
    return step;
  }),
  on(ResetStepFastTransfer, (state) => {
    return initStepFastTransfer;
  }),
);
