import { CustomerProfile } from '@app/core/models/user/user-profile';
import * as fromUser from '@store/actions/global/user/user.action';

export interface UserInfoState {
  data: CustomerProfile;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initUserInfo: UserInfoState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export function userInfoReducer(
  state: UserInfoState,
  action: fromUser.actions,
): UserInfoState {
  switch (action.type) {
    case fromUser.USER_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case fromUser.USER_SUCCESS:
      return {
        data: (action as fromUser.UserSuccessAction).user,
        loading: false,
        loaded: true,

        error: false,
      };

    case fromUser.USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };

    case fromUser.USER_RESET:
      return initUserInfo;

    default:
      return state;
  }
}
