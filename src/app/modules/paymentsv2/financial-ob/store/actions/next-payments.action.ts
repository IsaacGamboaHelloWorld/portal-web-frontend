import { createAction } from '@ngrx/store';

import { IFinancialOp } from '../../entities/financial-op';

const enum TypeActions {
  LOAD = '[NEXT PAYMENTS / API] Next FO Payments Load',
  FAIL = '[NEXT PAYMENTS / API] Next FO Payments Fail',
  SUCCESS = '[NEXT PAYMENTS / API] Next FO Payments Success',
  RESET = '[NEXT PAYMENTS / API] Next FO Payments Success',
}

export const NextFinancialOpPaymentsLoad = createAction(TypeActions.LOAD);

export const NextFinancialOpPaymentsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const NextFinancialOpPaymentsSuccess = createAction(
  TypeActions.SUCCESS,
  (billers: IFinancialOp[]) => ({ billers }),
);

export const NextFinancialOpPaymentsReset = createAction(TypeActions.RESET);
