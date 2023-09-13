import { createReducer, on } from '@ngrx/store';
import * as stepAction from '../actions/step.actions';
import { IStepLineTime } from '../state/payment-fd-pse.state';

export const initSetLineTime: IStepLineTime = {
  step: 1,
};

export const lineTimeReducer = createReducer(
  initSetLineTime,
  on(stepAction.SetStepAction, (state, { step }) => {
    return {
      ...state,
      step,
    };
  }),
  on(stepAction.ResetStepAction, (state) => {
    return initSetLineTime;
  }),
);
