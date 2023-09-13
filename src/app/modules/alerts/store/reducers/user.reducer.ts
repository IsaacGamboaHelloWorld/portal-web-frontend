import { createReducer, on } from '@ngrx/store';
import { IUserAlertResponse } from '../../entities/user';
import * as fromUser from '../actions/user.action';

export const initUsertAlert: IUserAlertResponse = {
  success: false,
  statusCode: null,
  errorMessage: '',
  specificErrorMessage: '',
  data: [],
  loaded: false,
  loading: false,
};
export const UserAlertReducer = createReducer(
  initUsertAlert,
  on(fromUser.UserAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromUser.UserAlertsSuccessAction, (state, { alert }) => {
    return {
      loaded: false,
      loading: false,
      success: alert.success,
      statusCode: alert.statusCode,
      errorMessage: alert.errorMessage,
      specificErrorMessage: alert.specificErrorMessage,
      data: alert.data,
    };
  }),
  on(fromUser.UserAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      errorMessage: data,
    };
  }),
  on(fromUser.UserAlertsResetAction, (state) => {
    return initUsertAlert;
  }),
);
