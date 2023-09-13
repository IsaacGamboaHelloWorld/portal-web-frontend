import { createAction } from '@ngrx/store';
import { IUserAlertRequest, IUserAlertResponse } from '../../entities/user';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load User Alerts',
  SUCCESS = '[ALERTS] Success User Alerts',
  FAIL = '[ALERTS] Error User Alerts',
  RESET = '[ALERTS] Reset User Alerts',
}

export const UserAlertsLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (request: IUserAlertRequest) => ({
    request,
  }),
);

export const UserAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alert: IUserAlertResponse) => ({ alert }),
);

export const UserAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const UserAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
