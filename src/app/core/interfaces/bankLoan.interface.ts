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
