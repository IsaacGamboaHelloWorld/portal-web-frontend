import { createAction } from '@ngrx/store';

enum typeActions {
  ValidatePing = '[DASHBOARD] validate Ping',
  PingSuccess = '[DASHBOARD] ping success',
  PingFail = '[DASHBOARD] ping fail',
}

export const ValidatePing = createAction(typeActions.ValidatePing);
export const PingSuccess = createAction(typeActions.PingSuccess);
export const PingFail = createAction(typeActions.PingFail);
