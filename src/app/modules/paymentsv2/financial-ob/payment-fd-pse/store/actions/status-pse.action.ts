import { createAction, props } from '@ngrx/store';
import { IPaymentPseStatusResponse } from '../../entities/status-pse.interface';

export enum TypeAction {
  LOAD_STATUS = '[PAYMENT FD] - Load Status Pse',
  SUCCESS_STATUS = '[PAYMENT FD] - Success Status Pse',
  FAIL_STATUS = '[PAYMENT FD] - Fail Status Pse',
  RESET_STATUS = '[PAYMENT FD] - Reset Status Pse',
}

export const loadStatusPseAction = createAction(
  TypeAction.LOAD_STATUS,
  props<{ paymentId: string }>(),
);

export const successStatusPseAction = createAction(
  TypeAction.SUCCESS_STATUS,
  props<{ data: IPaymentPseStatusResponse }>(),
);

export const failStatusPseAction = createAction(
  TypeAction.FAIL_STATUS,
  props<{ errorMessage: string }>(),
);

export const resetStatusPseAction = createAction(TypeAction.RESET_STATUS);
