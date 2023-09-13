import { combineReducers } from '@ngrx/store';

import { createAlertReducer as responseAlert } from './create-alert.reducer';
import { newAlertStepOneReducer as formOne } from './formOne.reducer';
import { newAlertStepTwoReducer as formTwo } from './formTwo.reducer';
import { homeAlertsReducer as alerts } from './get-alerts.reducer';
import { GroupsTypeAlertReducer as groupsTypeAlert } from './groups-type.reducer';
import { GroupsAlertReducer as groupsAlert } from './groups.reducer';
import { infoUserAlertsReducer as infoUser } from './info-user.reducer';
import { allFOAlertsReducer as allPayments } from './registered-bills.reducer';
import { allServicesAlertsReducer as allServices } from './registered-services.reducer';
import { stepLineTimeReducer as step } from './step.reducers';
import { TargetAlertReducer as targetAlert } from './target.reducer';
import { UserAlertReducer as userAlert } from './user.reducer';

export const AlertsHomeRootReducer = combineReducers({
  alerts,
  formOne,
  formTwo,
  allPayments,
  allServices,
  responseAlert,
  infoUser,
  step,
  userAlert,
  groupsAlert,
  groupsTypeAlert,
  targetAlert,
});
