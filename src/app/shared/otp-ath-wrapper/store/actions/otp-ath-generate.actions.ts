import { createAction, props } from '@ngrx/store';
import { OtpAthOperations } from '../../constants/otp-ath-operations.enum';
import { IOtpAthGenereateData } from '../../entites';

const enum TypeActionsOtpAthGen {
  LOAD = '[OTP ATH / API] Generate OTP Load',
  FAIL = '[OTP ATH / API] Generate OTP Fail',
  SUCCESS = '[OTP ATH / API] Generate OTP Success',
  RESET = '[OTP ATH / API] Generate OTP Reset',
}

export const OtpAthGenerateLoad = createAction(
  TypeActionsOtpAthGen.LOAD,
  props<{ transactionType: OtpAthOperations }>(),
);

export const OtpAthGenerateSuccess = createAction(
  TypeActionsOtpAthGen.SUCCESS,
  props<{ data: IOtpAthGenereateData }>(),
);

export const OtpAthGenerateFail = createAction(
  TypeActionsOtpAthGen.FAIL,
  props<{ errorMessage: string }>(),
);

export const OtpAthGenerateReset = createAction(TypeActionsOtpAthGen.RESET);
