import { createAction } from '@ngrx/store';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../entities/public-services';

const enum TYPE_ACTIONS {
  LOAD = '[RECURRING] Recurring payment Load',
  SUCCESS = '[RECURRING] Recurring payment Success',
  FAIL = '[RECURRING] Recurring payment Fail',
  RESET = '[RECURRING] Recurring payment Load',
}

export const RecurringLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (recurring: IRecurringPayment) => ({ recurring }),
);

export const RecurringFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const RecurringSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (recurring: IRecurringPaymentResponse) => ({ recurring }),
);

export const RecurringResetAction = createAction(TYPE_ACTIONS.RESET);
