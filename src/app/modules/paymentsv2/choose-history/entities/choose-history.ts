export interface IRespondHistoricPayments {
  records: Record[];
  filters: Filters;
  success: boolean;
  errorMessage: string;
}

export interface Filters {
  datePaymentsFrom: Date;
  datePaymentsTo: Date;
  limit: number;
  offset: number;
}

export interface Record {
  paymentType: string;
  paymentDate: Date;
  approvalId?: string;
  paymentStatus: string;
  destinationEntityName: string;
  nickName?: string;
  originAccount: string;
  originAccountType: string;
  amount: number;
  loanPaymentData?: PaymentData;
  paymentStatusMessage?: string;
  description?: string;
  creditCardPaymentData?: PaymentData;
  billerPaymentData?: BillerPaymentData;
  psePaymentData?: PsePaymentData;
  nonBillerPaymentData?: NonBillerPaymentData;
}

export interface BillerPaymentData {
  nie: string;
  serviceCode: string;
  invoice: string;
}

export interface PaymentData {
  accountId: string;
  accountType: string;
}

export interface NonBillerPaymentData {
  nie: string;
  serviceCode: string;
}

export interface PsePaymentData {
  serviceCode: string;
  invoice: string;
}
