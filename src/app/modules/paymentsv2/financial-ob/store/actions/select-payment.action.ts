import { createAction } from '@ngrx/store';

import { IFinancialOp } from '../../entities/financial-op';

const enum TypeActions {
  LOAD = '[SELECT PAYMENT / API] Select payment FO Load',
  FAIL = '[SELECT PAYMENT / API] Select payment FO Fail',
  SUCCESS = '[SELECT PAYMENT / API] Select payment FO Success',
  RESET = '[SELECT PAYMENT / API] Select payment FO Success',
}

export const SelectPaymentLoad = createAction(
  TypeActions.LOAD,
  (activePayment: IFinancialOp) => ({ activePayment }),
);
export const SelectPaymentSuccess = createAction(TypeActions.SUCCESS);

export const SelectPaymentReset = createAction(TypeActions.RESET);
