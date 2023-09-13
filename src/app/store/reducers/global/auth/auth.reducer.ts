import { UserData } from '@core/models/user/userData';
import { createReducer, on } from '@ngrx/store';
import * as fromAuth from '@store/actions/global/auth/auth.action';

export interface UserState {
  data: UserData;
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
}

export const initUser: UserState = {
  data: {
    lastAuthDate: null,
    clientName: null,
    currentDate: null,
    lastIpAddress: null,
  },
  loading: false,
  loaded: false,
  error: false,
};

export const userReducer = createReducer(
  initUser,
  on(fromAuth.LoginAction, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromAuth.LoginSuccessAction, (state, { user }) => {
    return {
      data: {
        lastAuthDate: user.lastAuthDate,
        clientName: user.clientName,
        currentDate: user.currentDate,
        lastIpAddress: user.lastIpAddress,
        processId: user.processId,
        step: user.step,
        secureDataBriefQuestion: user.secureDataBriefQuestion,
        sdsPasswordValidation: user.sdsPasswordValidation,
        request: user.request,
        hasFingerprintEnabled: user.hasFingerprintEnabled,
        rawId: user.rawId,
        experian: user.experian,
        progressBar: user.progressBar,
      },
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromAuth.LoginFailAction, (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
    };
  }),
  on(fromAuth.LoginResetAction, (state) => {
    return initUser;
  }),
);

export const IsLoggedReducer = createReducer(
  false,
  on(fromAuth.IsLogged, (state, { isLogged }) => {
    return isLogged;
  }),
);

export const RememberUserReducer = createReducer(
  null,
  on(fromAuth.RememberUserAction, (state, { userInfo }) => {
    return userInfo;
  }),
);
