import { createAction } from '@ngrx/store';

import { Record } from '@modules/payments/home-payments/entities/historic-payments';

const enum TypeActions {
  Load = '[CHOOSE HISTORY / API] Choose History Load',
  FAIL = '[CHOOSE HISTORY / API] Choose History Fail',
  SUCCESS = '[CHOOSE HISTORY / API] Choose History Success',
}

export const ChooseHistoryLoad = createAction(TypeActions.Load);

export const ChooseHistoryFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const ChooseHistorySuccess = createAction(
  TypeActions.SUCCESS,
  (history: Record[]) => ({ history }),
);
