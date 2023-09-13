import { createReducer, on } from '@ngrx/store';
import {
  smsFailActions,
  smsResetActions,
  smsSendActions,
  smsSuccessActions,
} from './../../../actions/global/auth/notification-sms.action';
export interface INotificaionSmsState {
  data: any;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  message: string;
}

export const initNotificationSms: INotificaionSmsState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  message: null,
};

export const notificationSmsReducers = createReducer(
  initNotificationSms,
  on(smsSendActions, (state) => state),
  on(smsSuccessActions, (state) => state),
  on(smsFailActions, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(smsResetActions, (state) => state),
);
