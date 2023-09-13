import * as fromChangePassword from '@app/store/actions/global/auth/change-password.action';

import { createReducer, on } from '@ngrx/store';

export interface ChangePasswordState {
  data?: any;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initChangePassword: ChangePasswordState = {
  loading: false,
  loaded: false,
  error: false,
};

export const changePasswordReducer = createReducer(
  initChangePassword,
  on(fromChangePassword.ChangePasswordAction, (state, { content }) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromChangePassword.ChangePasswordSuccessAction, (state) => {
    return {
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromChangePassword.ChangePasswordFailAction, (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
    };
  }),
  on(
    fromChangePassword.ChangePasswordResetAction,
    (state) => initChangePassword,
  ),
);
