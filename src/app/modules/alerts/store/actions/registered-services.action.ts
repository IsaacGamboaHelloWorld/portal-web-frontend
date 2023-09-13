import { createAction } from '@ngrx/store';

import { IPublicServiceAlerts } from '../../entities/alerts';

const enum TypeActions {
  LOAD = '[CREATE ALERT / API] Create alert Bills Load',
  FAIL = '[CREATE ALERT / API] Create alert Bills Fail',
  SUCCESS = '[CREATE ALERT / API] Create alert Bills Success',
  RESET = '[CREATE ALERT / API] Create alert Bills Reset',
}

export const AllPublicServicesAlertsLoad = createAction(TypeActions.LOAD);

export const AllPublicServicesAlertsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const AllPublicServicesAlertsSuccess = createAction(
  TypeActions.SUCCESS,
  (billers: IPublicServiceAlerts[]) => ({ billers }),
);

export const AllPublicServicesAlertsReset = createAction(TypeActions.RESET);
