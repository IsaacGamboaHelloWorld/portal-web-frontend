import { Product } from '@app/core/models/products/product';
import { IFinancialOp } from '../../entities/financial-op';

export interface IPaymentFormOne {
  account_origin: Product;
  loan_destination: any;
}

export interface IPaymentFormTwo {
  option_to_pay: string;
  amounttext: string;
  comments: string;
}

export interface IPaymentFormThree {
  date: string;
}

export interface IFinancialObRequest {
  originAccountId: string;
  originAccountType: string;
  amount: string | number;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickName: string;
  contract: string;
  invoice: string;
  dueDate: string;
  scheduledDate: string;
  expirationDate: string;
  isScheduledPayment: boolean;
  isDonePayment: boolean;
  primaryBillerAmount: string | number;
  primaryBillerCurrencyCode: string;
  reference: string;
  secondaryBillerAmount: string | number;
  secondaryBillerCurrencyCode: string;
  currencyCode: string;
  originAccountBank: string;
}

export interface IFinancialObResponse {
  date: string;
  approvalId: number;
  billerPayment: IFinancialOp;
  errorMessage?: string;
  success: boolean;
}

export interface ISuccessFinancialOb {
  data: IFinancialObResponse;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}
