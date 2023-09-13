export interface IFinancialOp {
  accountId: string;
  accountType: string;
  bank: string;
  loanName: string;
  bankName: string;
  newLoan: boolean;
  paymentInformation?: string;
  paymentId?: string;
  brandId?: string;
}

export interface ISetPayment {
  payData: IFinancialOp;
  activePayment?: IFinancialOp;
}

export interface INextFOPaymentsResponse {
  registeredLoans: IFinancialOp[];
  errorMessage?: string;
  success: boolean;
}

export interface IBank {
  approvalId: null;
  errorMessage: null;
  banks: IBankElement[];
  success: boolean;
}

export interface IBankElement {
  value: string;
  name: string;
}

export interface IBankLoan {
  approvalId: null;
  errorMessage: null;
  loans: IBankLoanElement[];
  success: boolean;
}

export interface IBankLoanElement {
  value: string;
  name: string;
}

export interface IFinancialObRequest {
  ownershipIdType: string;
  ownershipIdNumber: string;
  originAccountId: number;
  originAccountType: string;
  destinationAccountId: string;
  destinationAccountType: string;
  destinationLoanName: string;
  destinationNewLoan: string;
  bank: string;
  amount: string;
  notes: string;
}

export interface IFinancialObResponse {
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
  errorMessage?: string;
  success: boolean;
}

export interface IDeleteLoanRequest {
  accountId: number;
  accountType: string;
  bank: number;
}

export interface IDeleteLoanResponse {
  approvalId?: number;
  errorMessage?: string;
  success: boolean;
}
