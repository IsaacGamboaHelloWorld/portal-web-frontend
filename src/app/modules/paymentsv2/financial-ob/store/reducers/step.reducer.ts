import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/step.actions';
import { StepLineTime } from '../state/financial-op-module.state';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepOb, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepOb, (state) => {
    return initStepLineTime;
  }),
);
