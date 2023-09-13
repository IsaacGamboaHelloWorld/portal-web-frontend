export interface LoanObject {
  accountId: string;
  accountType: string;
  bank: string;
  loanName: string;
  newLoan: string;
  billerNickName?: string;
  billerName?: string;
  amount?: string | number;
}
