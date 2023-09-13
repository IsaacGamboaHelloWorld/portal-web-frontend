import { createAction } from '@ngrx/store';

enum typeActions {
  ValidateSession = '[DASHBOARD] validate session',
  SessionSuccess = '[DASHBOARD] session success',
  SessionFail = '[DASHBOARD] session fail',
}

export const ValidateSession = createAction(typeActions.ValidateSession);
export const SessionSuccess = createAction(typeActions.SessionSuccess);
export const SessionFail = createAction(typeActions.SessionFail);
