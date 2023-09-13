import { createAction } from '@ngrx/store';
import { IFinancialOp } from './../../../entities/financial-op';

const enum TypeActions {
  SET_REGISTED_OB = '[REGISTERED OB] - Set registered obligation',
  RESET_REGISTED_OB = '[REGISTERED OB] - Reset registered obligation',
}

export const SetRegisteredObligation = createAction(
  TypeActions.SET_REGISTED_OB,
  (registeredObligation: IFinancialOp) => ({ registeredObligation }),
);

export const ResetRegisteredObligation = createAction(
  TypeActions.RESET_REGISTED_OB,
);
