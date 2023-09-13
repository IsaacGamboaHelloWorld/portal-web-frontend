import { ISecurityModuleState } from '@app/modules/security-ds/store/state/security-state';
import { createSelector } from '@ngrx/store';
import { SecurityRootSelector } from '../../../../store/selectors/step.selectors';
import { IAccessControlModuleState } from '../state/access-control.state';

export const AccessControlSelector = createSelector(
  SecurityRootSelector,
  (state: ISecurityModuleState) => state.accessControl,
);

export const GetAccessControlSelector = createSelector(
  AccessControlSelector,
  (state: IAccessControlModuleState) => state.statusChannel,
);

export const CudAccessControlSelector = createSelector(
  AccessControlSelector,
  (state: IAccessControlModuleState) => state.cudStatusChannel,
);
