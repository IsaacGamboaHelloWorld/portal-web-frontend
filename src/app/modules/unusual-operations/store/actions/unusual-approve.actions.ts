import { createAction, props } from '@ngrx/store';
import { IUnusualOPApproveRequest } from '../../entities/unusual-approve-request.interface';
import { IAdditionalData } from '../../entities/unusual-approve-response.interface';

export enum TypeUnsualApproveAction {
  LOAD = '[UNUSUAL OP APPROVE] - Load',
  SUCCESS = '[UNUSUAL OP APPROVE] - Success',
  FAIL = '[UNUSUAL OP APPROVE] - Fail',
  RESET = '[UNUSUAL OP APPROVE] - Reset',
}

export const UnusualApproveLoadAction = createAction(
  TypeUnsualApproveAction.LOAD,
  props<{ body: IUnusualOPApproveRequest }>(),
);

export const UnusualApproveSuccessAction = createAction(
  TypeUnsualApproveAction.SUCCESS,
  props<{ data: IAdditionalData[] }>(),
);

export const UnusualApproveFailAction = createAction(
  TypeUnsualApproveAction.FAIL,
  props<{ errorMessage: string }>(),
);

export const UnusualApproveResetAction = createAction(
  TypeUnsualApproveAction.RESET,
);
