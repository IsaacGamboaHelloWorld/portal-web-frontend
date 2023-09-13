import { createAction } from '@ngrx/store';
import { IDebitCardListResponse } from '../../entities/debit-cards-response';

const enum TYPE_ACTIONS {
  LOAD = '[Debit Card List] Load',
  FAIL = '[Debit Card List] Fail',
  SUCCESS = '[Debit Card List] Success',
  RESET = '[Debit Card List] Reset',
}

export const DebitCardListLoad = createAction(TYPE_ACTIONS.LOAD);
export const DebitCardListFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const DebitCardListSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: IDebitCardListResponse) => ({ data }),
);
export const DebitCardListReset = createAction(TYPE_ACTIONS.RESET);
