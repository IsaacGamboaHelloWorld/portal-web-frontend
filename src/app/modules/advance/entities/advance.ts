import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IAdvanceResp extends GenericResponse {
  data: IAdvanceData;
}

export interface IAdvanceData {
  amt: number;
  currencyCode: string;
  approvalId: string;
  balance: number;
  Details: IDetail;
}

export interface IDetail {
  accountFromInformation: IAccountFromInformation;
  accountToInformation: IAccountToInformation;
  advanceInformation: IAdvanceInformation;
}

export interface IAdvanceInformation {
  amount: string;
  currencyCode: string;
  description: string;
  numberFees: number;
}

export interface IAccountToInformation {
  accountIdentifier: string;
  bank: string;
  productType: string;
}

export interface IAccountFromInformation {
  accountIdentifier: string;
  bank: string;
  expirationMonth: string;
  expirationYear: string;
  productType: string;
}
