import { Movement } from '@core/models/movement/movement';
import * as fromMovements from '@store/actions/models/movements/movement.action';

export interface MovementsState {
  account: Movement;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initMovements: MovementsState = {
  account: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: '',
};

export function movementReducer(
  state: MovementsState = initMovements,
  action: fromMovements.actions,
): MovementsState {
  switch (action.type) {
    case fromMovements.MOVEMENT_LOAD:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };

    case fromMovements.MOVEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        account: (action as fromMovements.MovementSuccessAction).movement,
      };

    case fromMovements.MOVEMENT_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        errorMessage: (action as fromMovements.MovementFailAction).errorMessage,
      };

    case fromMovements.MOVEMENT_RESET:
      return initMovements;

    default:
      return state;
  }
}
