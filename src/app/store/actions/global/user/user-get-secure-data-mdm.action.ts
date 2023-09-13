import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { Action } from '@ngrx/store';

export const USER_SECURE_DATA_MDM_LOAD = '[DASHBOARD] User Secure Data load';
export const USER_SECURE_DATA_MDM_SUCCESS =
  '[DASHBOARD] User Secure Data success';
export const USER_SECURE_DATA_MDM_FAIL = '[DASHBOARD] User Secure Data fail';
export const USER_SECURE_DATA_MDM_RESET = '[DASHBOARD] User Secure Data reset';

export class UserSecureDataLoadAction implements Action {
  readonly type: string = USER_SECURE_DATA_MDM_LOAD;
}

export class UserSecureDataSuccessAction implements Action {
  readonly type: string = USER_SECURE_DATA_MDM_SUCCESS;

  constructor(public user: UserSecureDataMdmResponse) {}
}

export class UserSecureDataFailAction implements Action {
  readonly type: string = USER_SECURE_DATA_MDM_FAIL;
}

export class UserSecureDataResetAction implements Action {
  readonly type: string = USER_SECURE_DATA_MDM_RESET;
}

export type actions =
  | UserSecureDataLoadAction
  | UserSecureDataSuccessAction
  | UserSecureDataFailAction
  | UserSecureDataResetAction;
