import { createReducer, on } from '@ngrx/store';
import { IFinancialOp } from '../../../entities/financial-op';
import * as fromActions from '../actions/registered-ob.actions';

export interface IRegisteredObligationPaymentPayments {
  registeredObligation: IFinancialOp;
}

export const initRegisteredObligationPaymentPayments: IRegisteredObligationPaymentPayments = {
  registeredObligation: null,
};

export const registeredObPaymentsReducer = createReducer(
  initRegisteredObligationPaymentPayments,
  on(fromActions.SetRegisteredObligation, (state, { registeredObligation }) => {
    return { registeredObligation };
  }),
  on(fromActions.ResetRegisteredObligation, (state) => {
    return initRegisteredObligationPaymentPayments;
  }),
);
