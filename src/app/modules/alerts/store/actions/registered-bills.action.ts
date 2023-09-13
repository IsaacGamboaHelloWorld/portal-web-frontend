import { createAction } from '@ngrx/store';
import { IFinancialOpAlerts } from '../../entities/alerts';

const enum TypeActions {
  LOAD = '[CREATE ALERT / API] Create alert FO Load',
  FAIL = '[CREATE ALERT / API] Create alert FO Fail',
  SUCCESS = '[CREATE ALERT / API] Create alert FO Success',
  RESET = '[CREATE ALERT / API] Create alert FO Reset',
}

export const AllFinancialOpAlertsLoad = createAction(TypeActions.LOAD);

export const AllFinancialOpAlertsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const AllFinancialOpAlertsSuccess = createAction(
  TypeActions.SUCCESS,
  (registeredLoans: IFinancialOpAlerts[]) => ({ registeredLoans }),
);

export const AllFinancialOpAlertsReset = createAction(TypeActions.RESET);
