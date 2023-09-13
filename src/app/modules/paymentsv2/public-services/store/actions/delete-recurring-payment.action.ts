import { createAction } from '@ngrx/store';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../entities/public-services';

const enum TYPE_ACTIONS {
  LOAD = '[RECURRING] Delete Recurring payment Load',
  SUCCESS = '[RECURRING] Delete Recurring payment Success',
  FAIL = '[RECURRING] Delete Recurring payment Fail',
  RESET = '[RECURRING] Delete Recurring payment Load',
}

export const DeleteRecurringLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (recurring: IRecurringPayment) => ({ recurring }),
);

export const DeleteRecurringFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const DeleteRecurringSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (recurring: IRecurringPaymentResponse) => ({ recurring }),
);

export const DeleteRecurringResetAction = createAction(TYPE_ACTIONS.RESET);
