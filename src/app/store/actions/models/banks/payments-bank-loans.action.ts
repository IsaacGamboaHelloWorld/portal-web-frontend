import { Action } from '@ngrx/store';

import { IBankLoanElement } from '@app/core/interfaces/bankLoan.interface';

export const LOAD_BANK_LOANS = '[Loans Payments] Load Bank Loans';
export const SUCCESS_BANK_LOANS = '[Loans Payments] Success Bank Loans';
export const ERROR_BANK_LOANS = '[Loans Payments] Error Bank Loans';
export const BANK_LOANS_RESET = '[Loans Payments] Bank Loans Reset';

export class LoadBankLoansAction implements Action {
  readonly type: string = LOAD_BANK_LOANS;

  constructor(public bank: string) {}
}

export class SuccessBankLoansAction implements Action {
  readonly type: string = SUCCESS_BANK_LOANS;

  constructor(public bankLoans: IBankLoanElement[]) {}
}

export class ErrorBankLoansAction implements Action {
  readonly type: string = ERROR_BANK_LOANS;
}

export class BankLoansResetAction implements Action {
  readonly type: string = ERROR_BANK_LOANS;
}

export type actions =
  | LoadBankLoansAction
  | SuccessBankLoansAction
  | ErrorBankLoansAction
  | BankLoansResetAction;
