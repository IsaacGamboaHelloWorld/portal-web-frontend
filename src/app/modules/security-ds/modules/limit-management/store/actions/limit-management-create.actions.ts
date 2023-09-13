import { createAction, props } from '@ngrx/store';
import { ILimitManagementCreateRequest } from '../../entities/limit-management-create.entity';
import { ILimitManagementCreateData } from '../state/limit-management.state';

export enum LimitManagementCreateAction {
  LOAD = '[LIMIT MANAGEMENT CREATE] - Load',
  SUCCESS = '[LIMIT MANAGEMENT CREATE] - Success',
  FAIL = '[LIMIT MANAGEMENT CREATE] - Fail',
  RESET = '[LIMIT MANAGEMENT CREATE] - Reset',
}

export const LimitManagementCreateLoadAction = createAction(
  LimitManagementCreateAction.LOAD,
  props<{ body: ILimitManagementCreateRequest }>(),
);

export const LimitManagementCreateSuccessAction = createAction(
  LimitManagementCreateAction.SUCCESS,
  props<{ data: ILimitManagementCreateData }>(),
);

export const LimitManagementCreateFailAction = createAction(
  LimitManagementCreateAction.FAIL,
  props<{ errorMessage: string }>(),
);

export const LimitManagementCreateResetAction = createAction(
  LimitManagementCreateAction.RESET,
);
