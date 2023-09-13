import { GenericResponse } from '@app/core/interfaces';
import { OtpAthOperations } from '../constants/otp-ath-operations.enum';

export interface IOtpAthGenerateRequest {
  transactionType: OtpAthOperations;
}

export interface IOtpAthGenerateResponse extends GenericResponse {
  otpData: IOtpAthGenereateData;
  generateOtpAllow: boolean;
}

export interface IOtpAthGenereateData {
  amount: string;
  currency: string;
  transactionRqUID: string;
  generateOtpAllow: boolean;
}
