import { IBankElement } from '@core/interfaces/banks.interface';
import * as fromBanks from '@store/actions/models/banks/banks.action';

export interface IBanks {
  data: IBankElement[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initBanks: IBanks = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
};

export function BanksReducer(
  state: IBanks = initBanks,
  action: fromBanks.actions,
): IBanks {
  switch (action.type) {
    case fromBanks.LOAD_BANKS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };

    case fromBanks.SUCCESS_BANKS:
      return {
        data: (action as fromBanks.SuccessBanksAction).banks,
        loaded: true,
        loading: false,
        error: false,
      };

    case fromBanks.ERROR_BANKS:
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
