export interface LoanDestinationInterface {
  accountId: string;
  accountType: string;
  bank: string;
  loanName: string;
  paymentInformation: string;
  paymentId: string;
}

export interface LoanDestinationRespInterface {
  registeredLoans: LoanDestinationInterface[];
}
