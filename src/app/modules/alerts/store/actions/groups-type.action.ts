import { createAction } from '@ngrx/store';
import {
  IGroupsTypeAlertRequest,
  IGroupsTypeAlertResponse,
} from '../../entities/groups-type';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Groups Type Alerts',
  SUCCESS = '[ALERTS] Success Groups Type Alerts',
  FAIL = '[ALERTS] Error Groups Type Alerts',
  RESET = '[ALERTS] Reset Groups Type Alerts',
}

export const GroupsTypeAlertsLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (request: IGroupsTypeAlertRequest) => ({
    request,
  }),
);

export const GroupsTypeAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alert: IGroupsTypeAlertResponse) => ({ alert }),
);

export const GroupsTypeAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const GroupsTypeAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
