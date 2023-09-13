import { IScheduledTransferSearch } from '@app/core/interfaces/scheduledTransfer.interface';
import * as fromScheduled from '@app/store/actions/models/transfer/scheduled-transfer/scheduled-transfers.action';
import { createReducer, on } from '@ngrx/store';

export interface IScheduledTransfers {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  transfers?: IScheduledTransferSearch[];
  success?: boolean;
  ip?: string;
  cost?: string;
}

export const initScheduledTransfer: IScheduledTransfers = {
  transfers: null,
  errorMessage: '',
  approvalId: '',
  specificErrorMessage: '',
  success: false,
  ip: '',
};

export const scheduledTransferReducer = createReducer(
  initScheduledTransfer,
  on(fromScheduled.ScheduledSearchLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      approvalId: '',
      specificErrorMessage: '',
      ip: '',
      cost: '',
    };
  }),

  on(fromScheduled.ScheduledSearchSuccess, (state, { scheduled }) => {
    return {
      ...state,
      errorMessage: scheduled.errorMessage,
      approvalId: scheduled.approvalId,
      success: scheduled.success,
      transfers: scheduled.transfers,
      ip: scheduled.ip,
      cost: scheduled.cost,
    };
  }),
  on(fromScheduled.ScheduledSearchFail, (state, { description }) => {
    return {
      ...state,
      success: false,
      approvalId: '',
      specificErrorMessage: '',
      errorMessage: description,
      ip: '',
      cost: '',
    };
  }),
  on(fromScheduled.ScheduledSearchReset, (state) => {
    return initScheduledTransfer;
  }),
);
