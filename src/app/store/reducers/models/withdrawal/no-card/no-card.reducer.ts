import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import * as fromWithDrawal from '../../../../actions/models/withdrawal/no-card/no-card.action';

export interface WithDrawalState {
  loading: boolean;
  loaded: boolean;
  error: string;
  data: OtpWithDrawal;
}

export const initWithdrawal: WithDrawalState = {
  loading: false,
  loaded: null,
  error: null,
  data: null,
};

export function noCardWitdrawalReducer(
  state: WithDrawalState = initWithdrawal,
  action: fromWithDrawal.actions,
): WithDrawalState {
  switch (action.type) {
    case fromWithDrawal.LOAD_WITHDRAWAL:
      return {
        loaded: null,
        error: null,
        loading: true,
        data: null,
      };

    case fromWithDrawal.SUCCESS_WITHDRAWAL:
      return {
        error: null,
        loading: false,
        loaded: true,
        data: (action as fromWithDrawal.SuccessWithDrawalAction).data,
      };

    case fromWithDrawal.FAIL_WITHDRAWAL:
      return {
        loaded: null,
        loading: false,
        error: (action as fromWithDrawal.FailWithDrawalAction).error,
        data: null,
      };

    case fromWithDrawal.RESET_WITHDRAWAL:
      return initWithdrawal;
    default:
      return state;
  }
}
