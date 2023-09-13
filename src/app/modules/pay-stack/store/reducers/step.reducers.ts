import { createReducer, on } from '@ngrx/store';
import { StepLineTime } from '../../entities/pay-stack';
import * as fromActions from '../actions/step.actions';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepPayStack, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepPayStack, (state) => {
    return initStepLineTime;
  }),
);
