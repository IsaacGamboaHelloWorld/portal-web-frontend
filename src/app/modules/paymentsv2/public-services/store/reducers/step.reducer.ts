import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/step.actions';
import { StepLineTime } from '../state/public-services-module.state';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepSp, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepSp, (state) => {
    return initStepLineTime;
  }),
);
