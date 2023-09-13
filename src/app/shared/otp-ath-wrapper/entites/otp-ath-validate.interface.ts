import { GenericResponse } from '@app/core/interfaces';
import { OtpAthOperations } from '../constants/otp-ath-operations.enum';

export interface IOtpAthValidateRequest {
  otpValue: string;
  transactionRqUID: string;
  transactionType: OtpAthOperations;
}

export interface IOtpAthValidateResponse extends GenericResponse {
  validateOtpData: IOtpAthValidateData;
}

export interface IOtpAthValidateData {
  amount: string;
  currency: string;
}
