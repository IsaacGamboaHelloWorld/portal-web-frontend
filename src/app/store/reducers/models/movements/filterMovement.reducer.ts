import * as fromMovementFilter from '@store/actions/models/movements/filterMovement.action';

export interface MovementFilterState {
  from: string;
  to: string;
  typeFilter: string;
}

export const initMovementFilter: MovementFilterState = {
  from: '',
  to: '',
  typeFilter: '',
};

export function movementFilterReducer(
  state: MovementFilterState = initMovementFilter,
  action: fromMovementFilter.actions,
): MovementFilterState {
  switch (action.type) {
    case fromMovementFilter.MOVEMENT_SAVE_FILTER:
      return {
        typeFilter: (action as fromMovementFilter.MovementSaveFilterAction)
          .typeFilter,
        from: (action as fromMovementFilter.MovementSaveFilterAction).from,
        to: (action as fromMovementFilter.MovementSaveFilterAction).to,
      };

    case fromMovementFilter.MOVEMENT_RESET_FILTER:
      return initMovementFilter;

    default:
      return state;
  }
}
