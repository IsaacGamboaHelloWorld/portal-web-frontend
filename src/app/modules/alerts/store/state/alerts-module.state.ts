import { Product } from '@core/models/products/product';
import { UserInfoState } from '../../../../store/reducers/global/user/user.reducer';
import {
  IAlertFormOne,
  IAlertFormThree,
  IAlertFormTwo,
  IinfoUser,
  StepLineTime,
} from '../../entities/alerts';
import { IGroupsAlertResponse } from '../../entities/groups';
import { IGroupsTypeAlertResponse } from '../../entities/groups-type';
import { ITargetAlertResponse } from '../../entities/target';
import { IUserAlertResponse } from '../../entities/user';
import { IHomeAlerts } from '../reducers/get-alerts.reducer';
import { IAllFinancialOpAlerts } from '../reducers/registered-bills.reducer';
import { IAllPublicServicesAlerts } from '../reducers/registered-services.reducer';

export const AlertsFeatureName = 'AlertsModuleState';
export const GeneralFeatureName = 'models';
export const GlobalFeatureName = 'global';

export type AlertsModuleState = Readonly<{
  alerts: IHomeAlerts;
  formOne: IAlertFormOne;
  formTwo: IAlertFormTwo;
  formThree: IAlertFormThree;
  allPayments: IAllFinancialOpAlerts;
  allServices: IAllPublicServicesAlerts;
  response_alert: any;
  infoUser: IinfoUser;
  step: StepLineTime;
  userAlert: IUserAlertResponse;
  groupsAlert: IGroupsAlertResponse;
  groupsTypeAlert: IGroupsTypeAlertResponse;
  targetAlert: ITargetAlertResponse;
}>;

export type GlobalState = Readonly<{
  userInfo: UserInfoState;
}>;

export type GeneralAllState = Readonly<{
  product: Product[];
}>;
