import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfoState } from '../../../../store/reducers/global/user/user.reducer';
import {
  IAlertFormOne,
  IAlertFormThree,
  IAlertFormTwo,
} from '../../entities/alerts';
import { ICreateAlert } from '../reducers/create-alert.reducer';
import { IHomeAlerts } from '../reducers/get-alerts.reducer';
import { IAllFinancialOpAlerts } from '../reducers/registered-bills.reducer';
import { IAllPublicServicesAlerts } from '../reducers/registered-services.reducer';
import {
  AlertsFeatureName,
  AlertsModuleState,
  GlobalFeatureName,
  GlobalState,
} from '../state/alerts-module.state';
export const AlertsRootSelector = createFeatureSelector<AlertsModuleState>(
  AlertsFeatureName,
);

export const GlobalRootSelector = createFeatureSelector<GlobalState>(
  GlobalFeatureName,
);

export const getAllAlerts = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.alerts,
);

export const selectAllAlerts = createSelector(
  getAllAlerts,
  (state: IHomeAlerts) => state,
);

export const getAllBasicData = createSelector(
  GlobalRootSelector,
  (state: GlobalState) => state.userInfo,
);

export const selectBasicData = createSelector(
  getAllBasicData,
  (state: UserInfoState) => state,
);

export const getStepOne = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.formOne,
);

export const selectStepOne = createSelector(
  getStepOne,
  (state: IAlertFormOne) => state,
);

export const getStepTwo = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.formTwo,
);

export const selectStepTwo = createSelector(
  getStepTwo,
  (state: IAlertFormTwo) => state,
);

export const getStepThree = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.formThree,
);

export const selectStepThree = createSelector(
  getStepThree,
  (state: IAlertFormThree) => state,
);

export const getAllFinancial = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.allPayments,
);

export const selectAllFinancial = createSelector(
  getAllFinancial,
  (state: IAllFinancialOpAlerts) => state,
);

export const getAllServices = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.allServices,
);

export const selectAllServices = createSelector(
  getAllServices,
  (state: IAllPublicServicesAlerts) => state,
);

export const getAlertCreate = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.response_alert,
);

export const selectAlertCreate = createSelector(
  getAlertCreate,
  (state: ICreateAlert) => state,
);

export const selectInfoUserAlert = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.infoUser,
);
export const selectStep = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.step,
);
export const selectUserAlert = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.userAlert,
);
export const selectTargetAlert = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.targetAlert,
);
export const selectGroupsAlert = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.groupsAlert,
);
export const selectGroupsTypeAlert = createSelector(
  AlertsRootSelector,
  (state: AlertsModuleState) => state.groupsTypeAlert,
);
