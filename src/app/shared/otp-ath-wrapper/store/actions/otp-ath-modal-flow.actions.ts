import { createAction } from '@ngrx/store';

const enum TypeActionsOtpAthModal {
  FLOW_SUCCESS = '[OTP ATH / API] Modal OTP Flow Success',
  FLOW_ERROR = '[OTP ATH / API] Modal OTP Flow Error',
  FLOW_RESET = '[OTP ATH / API] Modal OTP Flow Reset',
}

export const OtpAthModalFlowSuccess = createAction(
  TypeActionsOtpAthModal.FLOW_SUCCESS,
);

export const OtpAthModalFlowError = createAction(
  TypeActionsOtpAthModal.FLOW_ERROR,
);

export const OtpAthModalFlowReset = createAction(
  TypeActionsOtpAthModal.FLOW_RESET,
);
