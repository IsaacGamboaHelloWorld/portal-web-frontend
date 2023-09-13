import { PocketsByProduct } from '@app/core/models/products/pockets/pocketsByProduct';
import * as pocketActions from '@app/store/actions/models/pockets/user-pockets.action';

export interface UserPocketsState {
  productsWithPocketsInformation: PocketsByProduct[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initPockets: UserPocketsState = {
  productsWithPocketsInformation: [],
  loading: false,
  loaded: false,
  error: false,
};

export function pocketsReducer(
  state: UserPocketsState = initPockets,
  action: pocketActions.actions,
): UserPocketsState {
  switch (action.type) {
    case pocketActions.POCKETS_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case pocketActions.POCKETS_SUCCESS:
      return {
        productsWithPocketsInformation: (action as pocketActions.PocketsSuccessAction)
          .productsWithPocketsInformation,
        error: false,
        loading: false,
        loaded: true,
      };

    case pocketActions.POCKETS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
      };

    case pocketActions.POCKETS_RESET:
      return initPockets;

    default:
      return state;
  }
}
