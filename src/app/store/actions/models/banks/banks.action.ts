import { Action } from '@ngrx/store';

import { IBankElement } from '@core/interfaces/banks.interface';

export const LOAD_BANKS = '[Account Transfer] Load Banks';
export const SUCCESS_BANKS = '[Account Transfer] Success Banks';
export const ERROR_BANKS = '[Account Transfer] Error Banks';

export class LoadBanksAction implements Action {
  readonly type: string = LOAD_BANKS;
}

export class SuccessBanksAction implements Action {
  readonly type: string = SUCCESS_BANKS;

  constructor(public banks: IBankElement[]) {}
}

export class ErrorBanksAction implements Action {
  readonly type: string = ERROR_BANKS;
}

export type actions = LoadBanksAction | SuccessBanksAction | ErrorBanksAction;
