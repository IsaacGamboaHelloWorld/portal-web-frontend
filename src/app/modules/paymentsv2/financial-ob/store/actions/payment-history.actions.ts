import { Record } from '@modules/payments/home-payments/entities/historic-payments';
import { createAction } from '@ngrx/store';

const enum TypeActions {
  Load = '[PAYMENT HISTORY / API] Payment History Load',
  FAIL = '[PAYMENT HISTORY / API] Payment History Fail',
  SUCCESS = '[PAYMENT HISTORY / API] Payment History Success',
}

export const PaymentHistoryLoad = createAction(TypeActions.Load);

export const PaymentHistoryFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const PaymentHistorySuccess = createAction(
  TypeActions.SUCCESS,
  (history: Record[]) => ({ history }),
);
