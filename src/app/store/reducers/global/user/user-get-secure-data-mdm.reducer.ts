import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import * as fromUser from '@store/actions/global/user/user-get-secure-data-mdm.action';

export interface UserSecureDataMdmState {
  data: UserSecureDataMdmResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initUserSecureDataState: UserSecureDataMdmState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export function UserSecureDataMdmReducer(
  state: UserSecureDataMdmState,
  action: fromUser.actions,
): UserSecureDataMdmState {
  switch (action.type) {
    case fromUser.USER_SECURE_DATA_MDM_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case fromUser.USER_SECURE_DATA_MDM_SUCCESS:
      return {
        data: (action as fromUser.UserSecureDataSuccessAction).user,
        loading: false,
        loaded: true,
        error: false,
      };

    case fromUser.USER_SECURE_DATA_MDM_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };

    case fromUser.USER_SECURE_DATA_MDM_RESET:
      return initUserSecureDataState;

    default:
      return state;
  }
}
