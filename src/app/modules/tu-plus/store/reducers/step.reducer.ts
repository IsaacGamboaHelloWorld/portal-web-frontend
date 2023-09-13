import { createReducer, on } from '@ngrx/store';
import { StepLineTime } from '../../entities/your-plus.interface';
import { ResetStepYourPlus, SetStepYourPlus } from '../actions/step.actions';

export const initStepLineTime: StepLineTime = {
  step: 1,
};

export const YourPlusStateReducers = createReducer(
  initStepLineTime,
  on(SetStepYourPlus, (state, { step }) => {
    return step;
  }),
  on(ResetStepYourPlus, (state) => {
    return initStepLineTime;
  }),
);
