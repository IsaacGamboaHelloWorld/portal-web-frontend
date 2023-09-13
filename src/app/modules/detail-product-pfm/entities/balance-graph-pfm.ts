export interface BalanceGrapPfm {
  accountNumber?: string;
  balance: number;
  expenses: number;
  idProduct?: string;
  incomes: number;
  overdraft?: number;
  previousBalance: number;
  type?: 'CA' | 'CC' | 'ALL';
  saving?: number;
}
