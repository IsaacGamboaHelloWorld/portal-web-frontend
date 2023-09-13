import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IResConfiguration extends GenericResponse {
  MinCurAmt: MinCurAmt;
  MaxCurAmt: MaxCurAmt;
  OtpInfo: OtpInfo;
  LoyMemberPartnerInfo: LoyMemberPartnerInfo;
  ConversionFactor: number;
  Withholding: Withholding;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
  success: boolean;
}

export interface MinCurAmt {
  Amt: number;
}

export interface MaxCurAmt {
  Amt: number;
}

export interface OtpInfo {
  OtpValue: string;
  OtpRequired: boolean;
  MinCurAmt: MinCurAmt2;
}

export interface MinCurAmt2 {
  Amt: number;
}

export interface LoyMemberPartnerInfo {
  MemberStatusCode: string;
}

export interface Withholding {
  ValidateFlag: boolean;
  Percent: number;
  MinCurAmt: MinCurAmt3;
}

export interface MinCurAmt3 {
  Amt: number;
}
