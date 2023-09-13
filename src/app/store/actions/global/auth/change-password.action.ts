import { createAction } from '@ngrx/store';

enum typeActions {
  CHANGE_PASSWORD = '[AUTH] change password',
  CHANGE_PASSWORD_SUCCESS = '[AUTH] change password success',
  CHANGE_PASSWORD_FAIL = '[AUTH] change password fail',
  CHANGE_PASSWORD_RESET = '[AUTH] change password reset',
}

export const ChangePasswordAction = createAction(
  typeActions.CHANGE_PASSWORD,
  (content: any) => ({ content }),
);

export const ChangePasswordSuccessAction = createAction(
  typeActions.CHANGE_PASSWORD_SUCCESS,
);

export const ChangePasswordResetAction = createAction(
  typeActions.CHANGE_PASSWORD_RESET,
);

export const ChangePasswordFailAction = createAction(
  typeActions.CHANGE_PASSWORD_FAIL,
);
