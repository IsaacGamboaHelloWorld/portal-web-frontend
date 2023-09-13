import { NavigateSecurity } from '../../constants/navigate-security';
import { initCudAccessControl } from '../../modules/access-control/store/reducers/cud-access-control.reducers';
import { initAccessControl } from '../../modules/access-control/store/reducers/get-access-control.reducers';
import { IAccessControlModuleState } from '../../modules/access-control/store/state/access-control.state';
import {
  ILimitManagementeModuleState,
  initLimitManagement,
} from '../../modules/limit-management/store/state/limit-management.state';

export const SecurityFeatureName = 'securityModuleState';

export interface ISecurityModuleState {
  navigate: NavigateSecurity;
  accessControl: IAccessControlModuleState;
  limitManagement: ILimitManagementeModuleState;
}

export const initSecurityState: ISecurityModuleState = {
  navigate: NavigateSecurity.home,
  accessControl: {
    statusChannel: initAccessControl,
    cudStatusChannel: initCudAccessControl,
  },
  limitManagement: initLimitManagement,
};
