import { GenericResponse } from './generic-response.interface';

export interface PaymentBillsInterface {
  amount: string | number;
  primaryBillerAmount?: string | number;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: string | number;
  secondaryBillerCurrencyCode?: string;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickName: string;
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
}

export interface PaymentBillsRespInterface {
  approvalId: number;
  billerPayments: PaymentBillsInterface[];
  errorMessage: string;
  success: boolean;
}

export interface PaymentBillResponseInterface extends GenericResponse {
  date: string;
  approvalId: number;
  billerPayment: PaymentBillsInterface;
}

export interface CompanyInterface {
  organizationIdType: number;
  organizationId: number;
  entityName: string;
  industryCode: number;
  image: string;
  phoneType: string;
  phone: string;
  category: string;
  address: string;
  cityId: number;
  city: string;
  partialPayment: boolean;
  active: boolean;
  onlinePayment: number;
  svcId: number;
  noBillerMainReference: string;
  bankName: string;
  bankCode: number;
}

export interface CompanyListInterface {
  agreements: CompanyInterface[];
  success: boolean;
  errorMessage: string;
}

export interface IActiveCompanySave {
  company_code: number;
  company_name: string;
  billId: string;
}

export interface IAgreementSaved {
  approvalId: number;
  errorMessage?: string;
  success: boolean;
}

export interface IBillerHome {
  allowsOnlinePayment: boolean;
  allowsPartialPayment: boolean;
  billerId: string;
  billerName: string;
  billerNickname: string;
  city: string;
  contract: string;
  daysBeforeAfterExpiration: number;
  debtWithMainBiller: string;
  isBiller: boolean;
  maxAmount: number;
  minAmount: number;
  paymentAgreementType: string;
  paymentType: string;
}

export interface IBillerHomeResponse {
  billers: IBillerHome[];
  success: boolean;
  errorMessage?: string;
}

export interface IRecurringPayment {
  billerId: string;
  billerNickname: string;
  contract: string;
  reference: string;
  paymentType: string;
  maxAmount: number;
  daysBeforeAfterExpiration: number;
  originAccountId: string;
  originAccountType: string;
}

export interface IRecurringPaymentResponse {
  approvalId: number;
  success: boolean;
  errorMessage?: string;
}
