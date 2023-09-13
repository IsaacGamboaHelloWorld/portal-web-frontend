import { DataUser } from '@core/interfaces/dataUser.interface';
import { UserData } from '@core/models/user/userData';
import { createAction } from '@ngrx/store';

enum typeActions {
  LOGIN = '[AUTH] login',
  LOGIN_SUCCESS = '[AUTH] login success',
  LOGIN_FAIL = '[AUTH] login fail',
  LOGIN_RESET = '[AUTH] login reset',
  LOGOUT = '[Header] logout',
  IS_LOGGED = '[App] is logged',
  REMEMBER_USER = '[AUTH] remember user',
  FINGERPRINT_LOGIN = '[AUTH] fingerprint login',
}

export const FingerprintLoginAction = createAction(
  typeActions.FINGERPRINT_LOGIN,
  (user: UserData) => ({ user }),
);

export const LoginAction = createAction(
  typeActions.LOGIN,
  (dataUser: DataUser, typelogin?: string) => ({ dataUser, typelogin }),
);

export const LoginSuccessAction = createAction(
  typeActions.LOGIN_SUCCESS,
  (user: UserData) => ({ user }),
);

export const LoginFailAction = createAction(typeActions.LOGIN_FAIL);

export const LoginResetAction = createAction(typeActions.LOGIN_RESET);

export const LogOutAction = createAction(typeActions.LOGOUT);

export const IsLogged = createAction(
  typeActions.IS_LOGGED,
  (isLogged: boolean) => ({ isLogged }),
);

export const RememberUserAction = createAction(
  typeActions.REMEMBER_USER,
  (userInfo: string) => ({ userInfo }),
);
