import * as fromScheduled from '@app/store/actions/models/transfer/scheduled-transfer/scheduled-create-transfers.action';
import { createReducer, on } from '@ngrx/store';

export interface IScheduleTransfersCreate {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  scheduleId: number;
  success: boolean;
  dateTime: string;
  errorStatusCode: string;
  request: object;
  response: object;
}

export const initTransferCreate: IScheduleTransfersCreate = {
  approvalId: '',
  errorMessage: '',
  specificErrorMessage: '',
  scheduleId: null,
  success: false,
  dateTime: '',
  errorStatusCode: '',
  request: {},
  response: {},
};

export const scheduledTransferCreateReducer = createReducer(
  initTransferCreate,
  on(fromScheduled.ScheduledCreateLoad, (state) => {
    return {
      ...state,
      approvalId: '',
      errorMessage: '',
      specificErrorMessage: '',
      scheduleId: null,
      success: false,
      dateTime: '',
      errorStatusCode: '',
      request: {},
    };
  }),
  on(fromScheduled.ScheduledCreateSuccess, (state, { data }) => {
    return {
      scheduleId: data.scheduleId,
      success: data.success,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
      approvalId: data.approvalId,
      dateTime: data.dateTime,
      errorStatusCode: data.errorStatusCode,
      request: data.request,
      response: data.response,
    };
  }),
  on(fromScheduled.ScheduledCreateFail, (state, { description }) => {
    return {
      approvalId: '',
      errorMessage: description,
      specificErrorMessage: '',
      scheduleId: null,
      success: false,
      dateTime: '',
      errorStatusCode: '',
      request: {},
      response: {},
    };
  }),
  on(fromScheduled.ScheduledCreateReset, (state) => {
    return initTransferCreate;
  }),
);
