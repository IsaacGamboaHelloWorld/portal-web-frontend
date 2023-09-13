import { createAction, props } from '@ngrx/store';
import { IResOTPGeneration } from '../../entities/otp-generation.interface';

const enum TypeActionsOTPGeneration {
  LOAD = '[OTPGENERATION / API] OTPGeneration Load',
  FAIL = '[OTPGENERATION / API] OTPGeneration Fail',
  SUCCESS = '[OTPGENERATION / API] OTPGeneration Success',
  RESET = '[OTPGENERATION / API] OTPGeneration Reset',
}

export const OTPGenerationActionLoad = createAction(
  TypeActionsOTPGeneration.LOAD,
);

export const OTPGenerationActionSuccess = createAction(
  TypeActionsOTPGeneration.SUCCESS,
  props<{ data: IResOTPGeneration }>(),
);

export const OTPGenerationActionFail = createAction(
  TypeActionsOTPGeneration.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage: string;
    errorMessageCode: number;
  }>(),
);

export const OTPGenerationActionReset = createAction(
  TypeActionsOTPGeneration.RESET,
);
