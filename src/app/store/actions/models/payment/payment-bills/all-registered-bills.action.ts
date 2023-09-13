import { createAction } from '@ngrx/store';
import { IBillerHomeResponse } from '../../../../../core/interfaces/paymentBills.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Bills] All Registered Bills Load',
  SUCCESS = '[Bills] All Registered Bills Success',
  FAIL = '[Bills] All Registered Bills Fail',
  RESET = '[Bills] All Registered Bills Load',
}

export const BillsRegisteredLoadAction = createAction(TYPE_ACTIONS.LOAD);

export const BillsRegisteredFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const BillsRegisteredSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: IBillerHomeResponse) => ({ data }),
);

export const BillsRegisteredResetAction = createAction(TYPE_ACTIONS.RESET);
