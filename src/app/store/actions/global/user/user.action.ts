import { CustomerProfile } from '@app/core/models/user/user-profile';
import { Action } from '@ngrx/store';

export const USER_LOAD = '[DASHBOARD] Data load';
export const USER_SUCCESS = '[DASHBOARD] Data success';
export const USER_FAIL = '[DASHBOARD] Data fail';
export const USER_RESET = '[DASHBOARD] Data reset';

export class UserLoadAction implements Action {
  readonly type: string = USER_LOAD;
}

export class UserSuccessAction implements Action {
  readonly type: string = USER_SUCCESS;

  constructor(public user: CustomerProfile) {}
}

export class UserFailAction implements Action {
  readonly type: string = USER_FAIL;
}

export class UserResetAction implements Action {
  readonly type: string = USER_RESET;
}

export type actions =
  | UserLoadAction
  | UserSuccessAction
  | UserFailAction
  | UserResetAction;
