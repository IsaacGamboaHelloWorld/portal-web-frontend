import { createAction } from '@ngrx/store';
import { IFormOneTransferInterface } from '../../entities/formOneTransfer.interface';
import { IScheduleTransferCreate } from '../../entities/scheduledTransfer.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Account Transfer_Create] Scheduled transfer create Load',
  FAIL = '[Account Transfer_Create] Scheduled transfer create Fail',
  SUCCESS = '[Account Transfer_Create] Scheduled transfer create Success',
  RESET = '[Account Transfer_Create] Scheduled transfer create Reset',
}

export const ScheduledCreateLoad = createAction(
  TYPE_ACTIONS.LOAD,
  (
    formOne: IFormOneTransferInterface,
    amount: number | string,
    voucher: string,
    description: string,
    dueDate: string,
    isNew: boolean,
    scheduledTransfer: boolean,
    favorite: boolean,
    periodicity: string,
    numberRepeat: number,
    nickNameFrom: string,
    nickNameTo: string,
  ) => ({
    formOne,
    amount,
    voucher,
    description,
    dueDate,
    isNew,
    scheduledTransfer,
    favorite,
    periodicity,
    numberRepeat,
    nickNameFrom,
    nickNameTo,
  }),
);

export const ScheduledCreateFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const ScheduledCreateSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: IScheduleTransferCreate) => ({ data }),
);
export const ScheduledCreateReset = createAction(TYPE_ACTIONS.RESET);
