import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IResRedemption extends GenericResponse {
  approvalId: string;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
}

export interface IReqRedemption {
  totalPoints: number;
  curAmt: number;
  accountId: string;
  accountType: string;
  bankId: string;
  bankName: string;
  otpValue?: string;
  spRefId?: string;
}
