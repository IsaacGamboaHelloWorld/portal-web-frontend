import { createAction } from '@ngrx/store';
import {
  ITargetAlertRequest,
  ITargetAlertResponse,
} from '../../entities/target';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Target Alerts',
  SUCCESS = '[ALERTS] Success Target Alerts',
  FAIL = '[ALERTS] Error Target Alerts',
  RESET = '[ALERTS] Reset Target Alerts',
}

export const TargetAlertsLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (request: ITargetAlertRequest) => ({
    request,
  }),
);

export const TargetAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alert: ITargetAlertResponse) => ({ alert }),
);

export const TargetAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const TargetAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
