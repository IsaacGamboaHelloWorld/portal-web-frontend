import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import * as formOtpValidate from '@store/actions/models/withdrawal/steps/validate-otp.action';

export const initValidateOtp: OtpWithDrawal = {
  otp: null,
  validityTime: null,
  success: false,
  errorMessage: '',
  approvalId: null,
};

export function otpValidateReducer(
  state: OtpWithDrawal = initValidateOtp,
  action: formOtpValidate.actions,
): OtpWithDrawal {
  switch (action.type) {
    case formOtpValidate.SET_VALIDATE_OTP:
      return (action as formOtpValidate.SetValidateOtpAction).dataForm;

    case formOtpValidate.RESET_VALIDATE_OTP:
      return initValidateOtp;

    default:
      return state;
  }
}
