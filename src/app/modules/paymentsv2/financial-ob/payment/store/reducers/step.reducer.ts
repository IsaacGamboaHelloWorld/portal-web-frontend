import { createReducer, on } from '@ngrx/store';
import { StepLineTime } from '../../../store/state/financial-op-module.state';
import * as fromActions from '../actions/step.action';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepPayment, (state, { step }) => {
    return {
      ...state,
      step,
    };
  }),
  on(fromActions.ResetStepPayment, (state) => {
    return initStepLineTime;
  }),
);
