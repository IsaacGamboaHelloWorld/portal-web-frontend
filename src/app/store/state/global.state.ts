import { initUser, UserState } from '@store/reducers/global/auth/auth.reducer';
import {
  initNotification,
  INotificationState,
} from '@store/reducers/global/notification/notification.reducer';
import {
  initUserInfo,
  UserInfoState,
} from '@store/reducers/global/user/user.reducer';
import {
  ChangePasswordState,
  initChangePassword,
} from '../reducers/global/auth/change-password.reducer';
import {
  initNotificationSms,
  INotificaionSmsState,
} from '../reducers/global/auth/notification-sms.reducers';
import {
  initNotificationMM,
  INotificationMMState,
} from '../reducers/global/notification-multiple-message/notification-multiple-message.reducer';
import {
  initOptionModuleState,
  OptionModuleState,
} from '../reducers/global/option-module/option-module.reducer';
import {
  initUserSecureDataState,
  UserSecureDataMdmState,
} from '../reducers/global/user/user-get-secure-data-mdm.reducer';

export type GlobalState = Readonly<{
  user: UserState;
  notification: INotificationState;
  notificationMM: INotificationMMState;
  userInfo: UserInfoState;
  animateInit: boolean;
  isLogged: boolean;
  changePassword: ChangePasswordState;
  rememberUserInfo: string;
  userSecureData: UserSecureDataMdmState;
  optionModule: OptionModuleState;
  notificationSms: INotificaionSmsState;
}>;

export const INITIAL_GLOBALS_STATE: GlobalState = {
  user: initUser,
  notification: initNotification,
  notificationMM: initNotificationMM,
  userInfo: initUserInfo,
  animateInit: false,
  isLogged: false,
  changePassword: initChangePassword,
  rememberUserInfo: null,
  userSecureData: initUserSecureDataState,
  optionModule: initOptionModuleState,
  notificationSms: initNotificationSms,
};
