import { createAction } from '@ngrx/store';
import { ICreateUserAlertRequest } from '../../entities/alerts';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Create Alerts Loans',
  SUCCESS = '[ALERTS] Success Create Alerts Loans',
  FAIL = '[ALERTS] Error Create Alerts Loans',
  RESET = '[ALERTS] Reset Create Alerts Loans',
}

export const CreateAlertsLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (request: ICreateUserAlertRequest) => ({
    request,
  }),
);

export const CreateAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alert: any) => ({ alert }),
);

export const CreateAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const CreateAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
