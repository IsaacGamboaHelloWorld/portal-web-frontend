import { createAction, props } from '@ngrx/store';
import { ILimitManagementGetRequest } from '../../entities/limit-management-get.entity';
import { ILimitManagementGetData } from '../state/limit-management.state';

export enum LimitManagementGetAction {
  LOAD = '[LIMIT MANAGEMENT GET] - Load',
  SUCCESS = '[LIMIT MANAGEMENT GET] - Success',
  FAIL = '[LIMIT MANAGEMENT GET] - Fail',
  RESET = '[LIMIT MANAGEMENT GET] - Reset',
}

export const LimitManagementGetLoadAction = createAction(
  LimitManagementGetAction.LOAD,
  props<{ body: ILimitManagementGetRequest }>(),
);

export const LimitManagementGetSuccessAction = createAction(
  LimitManagementGetAction.SUCCESS,
  props<{ data: ILimitManagementGetData }>(),
);

export const LimitManagementGetFailAction = createAction(
  LimitManagementGetAction.FAIL,
  props<{ errorMessage: string }>(),
);

export const LimitManagementGetResetAction = createAction(
  LimitManagementGetAction.RESET,
);
