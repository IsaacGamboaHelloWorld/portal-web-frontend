import { createReducer, on } from '@ngrx/store';
import { IStepNewTransfer } from '../../entities/new-transfer.interface';
import {
  ResetStepNewTransfer,
  SetStepNewTransfer,
} from '../actions/step.actions';

export const initStepLineTime: IStepNewTransfer = {
  step: 1,
};

export const NewTransferStateReducers = createReducer(
  initStepLineTime,
  on(SetStepNewTransfer, (state, { step }) => {
    return step;
  }),
  on(ResetStepNewTransfer, (state) => {
    return initStepLineTime;
  }),
);
