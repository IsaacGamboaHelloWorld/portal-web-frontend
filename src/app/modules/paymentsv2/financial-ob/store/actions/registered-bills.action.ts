import { createAction } from '@ngrx/store';

import { IFinancialOp } from '../../entities/financial-op';

const enum TypeActions {
  LOAD = '[REGISTERED BILLS / API] Registered bills FO Load',
  FAIL = '[REGISTERED BILLS / API] Registered bills FO Fail',
  SUCCESS = '[REGISTERED BILLS / API] Registered bills FO Success',
  RESET = '[REGISTERED BILLS / API] Registered bills FO Success',
}

export const AllFinancialOpPaymentsLoad = createAction(TypeActions.LOAD);

export const AllFinancialOpPaymentsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const AllFinancialOpPaymentsSuccess = createAction(
  TypeActions.SUCCESS,
  (registeredLoans: IFinancialOp[]) => ({ registeredLoans }),
);

export const AllFinancialOpPaymentsReset = createAction(TypeActions.RESET);
