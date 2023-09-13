import { combineReducers } from '@ngrx/store';
import { animateInitReducer as animateInit } from '@store/reducers/global/auth/animate-init.reducer';
import {
  IsLoggedReducer as isLogged,
  RememberUserReducer as rememberUserInfo,
  userReducer as user,
} from '@store/reducers/global/auth/auth.reducer';
import { changePasswordReducer as changePassword } from '@store/reducers/global/auth/change-password.reducer';
import { notificationReducer as notification } from '@store/reducers/global/notification/notification.reducer';
import { optionModuleLoadReducer as optionModule } from '@store/reducers/global/option-module/option-module.reducer';
import { UserSecureDataMdmReducer as userSecureData } from '@store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { userInfoReducer as userInfo } from '@store/reducers/global/user/user.reducer';
import { notificationSmsReducers as notificationSms } from './auth/notification-sms.reducers';

export const global = combineReducers({
  user,
  notification,
  userInfo,
  animateInit,
  isLogged,
  changePassword,
  rememberUserInfo,
  userSecureData,
  optionModule,
  notificationSms,
});
