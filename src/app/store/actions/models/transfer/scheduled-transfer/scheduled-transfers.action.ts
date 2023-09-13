import { createAction } from '@ngrx/store';

import { IScheduledTransfersSearch } from '@app/core/interfaces/scheduledTransfer.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Account Transfer Search] Scheduled transfer search Load',
  FAIL = '[Account Transfer Search] Scheduled transfer search Fail',
  SUCCESS = '[Account Transfer Search] Scheduled transfer search Success',
  RESET = '[Account Transfer Search] Scheduled transfer search Reset',
}

export const ScheduledSearchLoad = createAction(TYPE_ACTIONS.LOAD);

export const ScheduledSearchFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const ScheduledSearchSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (scheduled: IScheduledTransfersSearch) => ({ scheduled }),
);

export const ScheduledSearchReset = createAction(TYPE_ACTIONS.RESET);
