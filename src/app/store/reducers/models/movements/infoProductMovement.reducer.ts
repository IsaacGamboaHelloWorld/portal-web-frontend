import * as fromMovementData from '@store/actions/models/movements/infoProductMovement.action';

export interface MovementDataState {
  typeAccount: string;
  accountId: string;
}

export const initMovementData: MovementDataState = {
  typeAccount: '',
  accountId: '',
};

export function movementDataReducer(
  state: MovementDataState = initMovementData,
  action: fromMovementData.actions,
): MovementDataState {
  switch (action.type) {
    case fromMovementData.MOVEMENT_SAVE_DATA:
      return {
        accountId: (action as fromMovementData.MovementSaveDataAction)
          .accountId,
        typeAccount: (action as fromMovementData.MovementSaveDataAction)
          .typeAccount,
      };

    case fromMovementData.MOVEMENT_RESET_DATA:
      return initMovementData;

    default:
      return state;
  }
}
