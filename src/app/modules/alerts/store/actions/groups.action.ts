import { createAction } from '@ngrx/store';
import {
  IGroupsAlertRequest,
  IGroupsAlertResponse,
} from '../../entities/groups';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Groups Alerts',
  SUCCESS = '[ALERTS] Success Groups Alerts',
  FAIL = '[ALERTS] Error Groups Alerts',
  RESET = '[ALERTS] Reset Groups Alerts',
}

export const GroupsAlertsLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (request: IGroupsAlertRequest) => ({
    request,
  }),
);

export const GroupsAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alert: IGroupsAlertResponse) => ({ alert }),
);

export const GroupsAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const GroupsAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
