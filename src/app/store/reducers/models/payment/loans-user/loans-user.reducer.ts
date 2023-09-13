import { LoanDestinationInterface } from '@app/core/interfaces/loan-destination.interface';
import * as fromDestination from '../../../../actions/models/payment/payment-destination/payment-destination.action';

export interface LoansUserState {
  loans: LoanDestinationInterface[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initLoansUser: LoansUserState = {
  loans: [],
  loading: false,
  loaded: false,
  error: false,
};

export function loansUserReducer(
  state: LoansUserState = initLoansUser,
  action: fromDestination.actions,
): LoansUserState {
  switch (action.type) {
    case fromDestination.PAYMENT_DESTINATION_PRODUCTS_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case fromDestination.PAYMENT_DESTINATION_PRODUCTS_SUCCESS:
      return {
        loans: (action as fromDestination.LoansDestinationSuccessAction).loans,
        error: false,
        loading: false,
        loaded: true,
      };

    case fromDestination.PAYMENT_DESTINATION_PRODUCTS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
      };

    case fromDestination.PAYMENT_DESTINATION_PRODUCTS_RESET:
      return initLoansUser;

    default:
      return state;
  }
}
