import { createAction } from '@ngrx/store';

import { Record } from '@modules/payments/home-payments/entities/historic-payments';

const enum TypeActions {
  Load = '[HOME PAYMENTS / API] Historic payments Load',
  FAIL = '[HOME PAYMENTS / API] Historic payments Fail',
  SUCCESS = '[HOME PAYMENTS / API] Historic payments Success',
}

export const HistoricPaymentsLoad = createAction(TypeActions.Load);

export const HistoricPaymentsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const HistoricPaymentsSuccess = createAction(
  TypeActions.SUCCESS,
  (history: Record[]) => ({ history }),
);
