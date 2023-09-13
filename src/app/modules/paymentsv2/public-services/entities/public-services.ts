import { Product } from '@core/models/products/product';

export interface IPublicService {
  amount: string | number;
  primaryBillerAmount?: string | number;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: string | number;
  secondaryBillerCurrencyCode?: string;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickname?: string;
  billerNickName?: string;
  contract: string;
  currencyCode: string;
  dueDate: string;
  expirationDate: string;
  invoice: string;
  isDonePayment: boolean;
  isScheduledPayment: boolean;
  originAccountId: string;
  originAccountType: string;
  scheduledDate?: string;
  accountType?: string;
  accountId?: string;
  bank?: string;
  secondaryAmount?: string;
  secondaryCurrencyCode?: string;
  debtWithMainBiller?: string;
  paymentType?: string;
  maxAmount?: string;
  daysBeforeAfterExpiration?: string;
  reference?: string;
  isBiller?: boolean;
}

export interface INextPaymentsResponse {
  approvalId?: number;
  billerPayments: IPublicService[];
  errorMessage?: string;
  success: boolean;
}

export interface IDeleteServiceRequest {
  billerId: number;
  billerNickname: string;
  contract: number;
  isBiller: boolean;
}

export interface IDeleteServiceResponse {
  approvalId?: number;
  errorMessage?: string;
  success: boolean;
}

export interface ISetPayment {
  payData: IPublicService;
}

export interface IRecurringPayment {
  billerId: string;
  billerNickname: string;
  contract: string;
  reference: string;
  paymentType: string;
  maxAmount?: string;
  daysBeforeAfterExpiration?: string;
  originAccountId: string;
  originAccountType: string;
  editMode: boolean;
}

export interface IRecurringPaymentResponse {
  approvalId: number;
  success: boolean;
  errorMessage?: string;
}

export interface IEditRecurring {
  account_origin: Product;
  date: string;
  amount: string;
}
