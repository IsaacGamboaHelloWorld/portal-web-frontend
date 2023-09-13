import { SecurityRootSelector } from '@app/modules/security-ds/store/selectors/step.selectors';
import { ISecurityModuleState } from '@app/modules/security-ds/store/state/security-state';
import { createSelector } from '@ngrx/store';
import { ILimitManagementeModuleState } from '../state/limit-management.state';

export const LimitManagementSelector = createSelector(
  SecurityRootSelector,
  (state: ISecurityModuleState) => state.limitManagement,
);

export const LimitManagementCreateSelector = createSelector(
  LimitManagementSelector,
  (state: ILimitManagementeModuleState) => state.create,
);

export const LimitManagementGetSelector = createSelector(
  LimitManagementSelector,
  (state: ILimitManagementeModuleState) => state.get,
);
