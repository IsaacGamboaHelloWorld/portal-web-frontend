import { Action } from '@ngrx/store';

export const SET_TYPE_WITHDRAWAL = '[Withdrawal] Set type';

export class SetTypeWithdrawal implements Action {
  readonly type: string = SET_TYPE_WITHDRAWAL;
  constructor(public typeTransaction: string) {}
}

export type actions = SetTypeWithdrawal;
