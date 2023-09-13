import { createReducer, on } from '@ngrx/store';
import { StepLineTime } from '../../entities/alerts';
import * as fromActions from '../actions/step.actions';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepAlert, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepAlert, (state) => {
    return initStepLineTime;
  }),
);
