import { createAction, props } from '@ngrx/store';
import { IOtpAthValidateData, IOtpAthValidateRequest } from '../../entites';

const enum TypeActionsOtpValidate {
  LOAD = '[OTP ATH / API] Validate OTP Load',
  FAIL = '[OTP ATH / API] Validate OTP Fail',
  SUCCESS = '[OTP ATH / API] Validate OTP Success',
  RESET = '[OTP ATH / API] Validate OTP Reset',
}

export const OtpAthValidateLoad = createAction(
  TypeActionsOtpValidate.LOAD,
  props<IOtpAthValidateRequest>(),
);

export const OtpAthValidateSuccess = createAction(
  TypeActionsOtpValidate.SUCCESS,
  props<{ data: IOtpAthValidateData }>(),
);

export const OtpAthValidateFail = createAction(
  TypeActionsOtpValidate.FAIL,
  props<{ errorMessage: string }>(),
);

export const OtpAthValidateReset = createAction(TypeActionsOtpValidate.RESET);
