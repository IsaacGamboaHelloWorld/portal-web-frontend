import * as fromScheduled from '@app/store/actions/models/transfer/scheduled-transfer/scheduled-delete-transfer.action';
import { createReducer, on } from '@ngrx/store';

export interface IScheduleTransfersDelete {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export const initScheduledTransferDelete: IScheduleTransfersDelete = {
  errorMessage: '',
  approvalId: '',
  specificErrorMessage: '',
  success: false,
};

export const scheduledTransferDeleteReducer = createReducer(
  initScheduledTransferDelete,
  on(fromScheduled.ScheduledDeleteLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      approvalId: '',
      specificErrorMessage: '',
    };
  }),

  on(fromScheduled.ScheduledDeleteSuccess, (state, { data }) => {
    return {
      ...state,
      errorMessage: data.errorMessage,
      approvalId: data.approvalId,
      success: data.success,
    };
  }),
  on(fromScheduled.ScheduledDeleteFail, (state, { description }) => {
    return {
      ...state,
      success: false,
      approvalId: '',
      specificErrorMessage: '',
      errorMessage: description,
    };
  }),
);
