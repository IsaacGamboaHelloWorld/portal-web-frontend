import { createAction, props } from '@ngrx/store';
import { OtpAthOperations } from '../../constants/otp-ath-operations.enum';

const enum TypeActionsOtpAthModal {
  OPEN = '[OTP ATH / API] Modal OTP Open',
  CLOSE = '[OTP ATH / API] Modal OTP Close',
}

export const OtpAthModalOpen = createAction(
  TypeActionsOtpAthModal.OPEN,
  props<{ transactionType: OtpAthOperations }>(),
);

export const OtpAthModalClose = createAction(TypeActionsOtpAthModal.CLOSE);
