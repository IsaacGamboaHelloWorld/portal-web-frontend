import { IBankLoanElement } from '@app/core/interfaces/bankLoan.interface';
import * as fromBankLoans from '@store/actions/models/banks/payments-bank-loans.action';

export interface IBankLoans {
  data: IBankLoanElement[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initBanks: IBankLoans = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
};

export function BankLoansReducer(
  state: IBankLoans = initBanks,
  action: fromBankLoans.actions,
): IBankLoans {
  switch (action.type) {
    case fromBankLoans.LOAD_BANK_LOANS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };

    case fromBankLoans.SUCCESS_BANK_LOANS:
      return {
        data: (action as fromBankLoans.SuccessBankLoansAction).bankLoans,
        loaded: true,
        loading: false,
        error: false,
      };

    case fromBankLoans.ERROR_BANK_LOANS:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };

    default:
      return state;
  }
}
