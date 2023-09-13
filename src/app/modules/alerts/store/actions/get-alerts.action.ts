import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Alerts Loans',
  SUCCESS = '[ALERTS] Success Alerts Loans',
  FAIL = '[ALERTS] Error Alerts Loans',
  RESET = '[ALERTS] Reset Alerts Loans',
}

export const LoadAlertsLoadAction = createAction(TYPE_ACTIONS.LOAD);

export const LoadAlertsSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (alerts: any) => ({ alerts }),
);

export const LoadAlertsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const LoadAlertsResetAction = createAction(TYPE_ACTIONS.RESET);
