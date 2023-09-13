import { createReducer, on } from '@ngrx/store';
import { StepLineTime } from '../../entities/payment-taxes';
import * as fromActions from '../actions/step.actions';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const stepLineTimeReducer = createReducer(
  initStepLineTime,
  on(fromActions.SetStepTaxes, (state, { step }) => {
    return step;
  }),
  on(fromActions.ResetStepTaxes, (state) => {
    return initStepLineTime;
  }),
);
