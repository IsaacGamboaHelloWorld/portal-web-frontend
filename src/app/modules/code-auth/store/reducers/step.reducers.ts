import { createReducer, on } from '@ngrx/store';
import { StepBar } from '../../entities/code-auth';
import * as fromActions from '../actions/step.actions';

export const initStepLineTime: StepBar = {
  step: 1,
};

export const StepBarReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepCodeAuth, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepCodeAuth, (state) => {
    return initStepLineTime;
  }),
);
