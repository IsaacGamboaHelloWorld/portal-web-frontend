import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import { Action } from '@ngrx/store';

export const SET_VALIDATE_OTP = '[Withdrawal] Validate Otp';
export const RESET_VALIDATE_OTP = '[Withdrawal] Reset Validate Otp';

export class SetValidateOtpAction implements Action {
  readonly type: string = SET_VALIDATE_OTP;
  constructor(public dataForm: OtpWithDrawal) {}
}

export class ResetValidateOtpAction implements Action {
  readonly type: string = RESET_VALIDATE_OTP;
}

export type actions = SetValidateOtpAction | ResetValidateOtpAction;
