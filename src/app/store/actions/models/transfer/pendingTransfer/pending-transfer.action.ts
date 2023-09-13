import { createAction } from '@ngrx/store';

import { IPendingTransfer } from '@core/interfaces/pendingTransfer.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Account Transfer] Pending transfer Load',
  FAIL = '[Account Transfer] Pending transfer Fail',
  SUCCESS = '[Account Transfer] Pending transfer Success',
}

export const PendingLoad = createAction(TYPE_ACTIONS.LOAD);

export const PendingFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const PendingSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (pending: IPendingTransfer[]) => ({ pending }),
);
