import { combineReducers } from '@ngrx/store';

import { AccessControlRoot as accessControl } from '../../modules/access-control/store/reducers';
import { limitManagementRootReducer as limitManagement } from '../../modules/limit-management/store/reducers';
import { stepGetAccessControlReducer as navigate } from './step.reducers';

export const SecurityRootReducer = combineReducers({
  navigate,
  accessControl,
  limitManagement,
});
