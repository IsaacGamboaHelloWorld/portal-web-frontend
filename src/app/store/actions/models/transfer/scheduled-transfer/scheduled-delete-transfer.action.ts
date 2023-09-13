import { IScheduleTransferDelete } from '@app/core/interfaces/scheduledTransfer.interface';
import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[Account Transfer Delete] Scheduled transfer delete Load',
  FAIL = '[Account Transfer Delete] Scheduled transfer delete Fail',
  SUCCESS = '[Account Transfer Delete] Scheduled transfer delete Success',
}

export const ScheduledDeleteLoad = createAction(
  TYPE_ACTIONS.LOAD,
  (id: string) => ({
    id,
  }),
);

export const ScheduledDeleteFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const ScheduledDeleteSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: IScheduleTransferDelete) => ({ data }),
);
