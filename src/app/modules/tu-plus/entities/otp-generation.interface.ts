import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IResOTPGeneration extends GenericResponse {
  BankInfo: BankInfo;
  Transaction: Transaction;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
  success: boolean;
}

export interface BankInfo {
  BankIdType: string;
}

export interface Transaction {
  ApprovalId: string;
}
