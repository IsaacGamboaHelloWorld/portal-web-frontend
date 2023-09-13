import { createReducer, on } from '@ngrx/store';
import {
  resetStepRecharge,
  setStepRecharge,
} from '@store/actions/models/recharge/step.action';

export const StepRechargeReducer = createReducer(
  1,
  on(setStepRecharge, (state, { step }) => {
    return step;
  }),
  on(resetStepRecharge, (state) => 1),
);
