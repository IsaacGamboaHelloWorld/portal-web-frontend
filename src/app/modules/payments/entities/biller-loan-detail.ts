export interface ISendBillerLoanDetail {
  billerId: string;
  contract: string;
}

export interface IAnswerBillerLoanDetail {
  approvalId?: string;
  success?: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
  date?: string;
  billerPayment: PaymentBillsInterface;
}

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
