import * as fromTransfer from '../actions/transfer-account-action';

import { AccountTransferInterface } from '../../entities/accountTransfer.interface';

export interface IAccountTransferState {
  data: AccountTransferInterface;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  specificErrorCode: string;
}

export const initAccountTransfer: IAccountTransferState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  specificErrorCode: null,
};

export function accountTransferReducer(
  state: IAccountTransferState = initAccountTransfer,
  action: fromTransfer.actions,
): IAccountTransferState {
  switch (action.type) {
    case fromTransfer.TRANSFER_LOAD:
      return {
        ...state,
        error: false,
        loaded: false,
        loading: true,
        specificErrorCode: null,
      };

    case fromTransfer.TRANSFER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        data: (action as fromTransfer.TransferSuccessAction).transfer,
      };

    case fromTransfer.TRANSFER_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        specificErrorCode: (action as fromTransfer.TransferFailAction)
          .specificErrorCode,
      };

    case fromTransfer.TRANSFER_RESET:
      return initAccountTransfer;

    default:
      return state;
  }
}
