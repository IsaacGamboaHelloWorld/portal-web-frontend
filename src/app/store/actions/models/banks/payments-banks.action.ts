import { Action } from '@ngrx/store';

import { IBankElement } from '@core/interfaces/banks.interface';

export const LOAD_LOANS_AVAILABLE_BANKS =
  '[Loans Payments] Load Loans Available Banks';
export const SUCCESS_LOANS_AVAILABLE_BANKS =
  '[Loans Payments] Success Loans Available Banks';
export const ERROR_LOANS_AVAILABLE_BANKS =
  '[Loans Payments] Error Loans Available Banks';

export class LoadLoansAvailableBanksAction implements Action {
  readonly type: string = LOAD_LOANS_AVAILABLE_BANKS;
}

export class SuccessBanksAction implements Action {
  readonly type: string = SUCCESS_LOANS_AVAILABLE_BANKS;

  constructor(public banks: IBankElement[]) {}
}

export class ErrorBanksAction implements Action {
  readonly type: string = ERROR_LOANS_AVAILABLE_BANKS;
}

export type actions =
  | LoadLoansAvailableBanksAction
  | SuccessBanksAction
  | ErrorBanksAction;
