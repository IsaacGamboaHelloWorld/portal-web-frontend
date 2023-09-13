import { GenericResponse } from './generic-response.interface';

export interface PaymentInterface extends GenericResponse {
  amount: number;
  approvalId: string;
  bankName: string;
  date: string;
  destinationAccount: string;
  destinationAccountType: string;
  destinationClientName: string;
  originAccount: string;
  originAccountType: string;
  transactionCost: string;
  errorDescription?: string;
}
