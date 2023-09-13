import { AccountType } from '../models/products/accountType';

export interface BaseResponseFreeDestination {
  errorStatusCode: any;
  approvalId: any;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface ResponseFreeDestinationAll
  extends BaseResponseFreeDestination {
  freeDestinationCredits: FreeDestination[] | null;
}

export interface FreeDestination {
  accountIdentifier: string;
  creditCode: string;
  creditName: string;
}

export interface ResponseFreeDestinationDetail
  extends BaseResponseFreeDestination {
  freeDestinationCredit: FreeDestinationDetail;
}

export interface FreeDestinationDetail {
  accountInformation?: AccountType;
  accountIdentifier: string;
  productType: string;
  clientDate: string;
  creditCode: string;
  creditName: string;
  currentStatus: string;
  totalDueAmount: number;
  nextPaymentAmount: number;
  dueDate: string;
  dueDays: number;
  currentRate: number;
  dueRate: number;
  startDate: string;
  minimumAmountToPay: number;
  outstandingBalance: number;
  approvalAmount: number;
  disburseValue: number;
  term: number;
  error: boolean;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
}
