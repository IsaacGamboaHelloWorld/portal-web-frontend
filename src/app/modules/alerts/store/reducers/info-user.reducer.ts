import { createReducer, on } from '@ngrx/store';
import { IinfoUser } from '../../entities/alerts';
import * as fromInfoUser from '../../store/actions/info-user.action';

export const initInfoUserAlerts: IinfoUser = {
  email: '',
  phoneNumber: '',
  errorMessage: '',
  success: false,
  request: null,
  dateTime: '',
  loading: false,
};
export const infoUserAlertsReducer = createReducer(
  initInfoUserAlerts,
  on(fromInfoUser.InfoUserLoadAction, (state) => {
    return {
      ...state,
      loading: true,
      email: '',
      phoneNumber: '',
      errorMessage: '',
      success: false,
      request: null,
      dateTime: '',
    };
  }),
  on(fromInfoUser.InfoUserSuccessAction, (state, { info }) => {
    return {
      email: info.email,
      phoneNumber: info.phoneNumber,
      errorMessage: info.errorMessage,
      success: info.success,
      request: info.request,
      dateTime: info.dateTime,
      loading: false,
    };
  }),
  on(fromInfoUser.InfoUserFailAction, (state, { data }) => {
    return {
      ...state,
      loading: false,
      errorMessage: data,
    };
  }),
  on(fromInfoUser.InfoUserResetAction, (state) => {
    return initInfoUserAlerts;
  }),
);
