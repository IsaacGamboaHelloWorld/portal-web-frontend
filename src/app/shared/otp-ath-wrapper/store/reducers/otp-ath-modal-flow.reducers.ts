import { createReducer, on } from '@ngrx/store';
import {
  OtpAthModalFlowError,
  OtpAthModalFlowReset,
  OtpAthModalFlowSuccess,
} from '../actions';
import { IOtpAthModalFlow } from '../state/otp-auth.state';

export const initOtpAthModalFlow: IOtpAthModalFlow = {
  success: false,
};

export const OtpAthModalFlowReducer = createReducer(
  initOtpAthModalFlow,
  on(OtpAthModalFlowSuccess, (state) => {
    return {
      ...state,
      success: true,
    };
  }),
  on(OtpAthModalFlowError, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(OtpAthModalFlowReset, () => {
    return initOtpAthModalFlow;
  }),
);
