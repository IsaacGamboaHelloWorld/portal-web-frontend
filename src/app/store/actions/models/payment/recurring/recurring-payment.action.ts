import { createAction } from '@ngrx/store';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../../../../core/interfaces/paymentBills.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Recurring] Recurring payment Load',
  SUCCESS = '[Recurring] Recurring payment Success',
  FAIL = '[Recurring] Recurring payment Fail',
  RESET = '[Recurring] Recurring payment Load',
}

export const RecurringPaymentLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (recurring: IRecurringPayment) => ({ recurring }),
);

export const RecurringPaymentFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const RecurringPaymentSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (recurring: IRecurringPaymentResponse) => ({ recurring }),
);

export const RecurringPaymentResetAction = createAction(TYPE_ACTIONS.RESET);
