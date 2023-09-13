import { createAction, props } from '@ngrx/store';
import {
  IPaymentPseRequest,
  IPaymentPseResponse,
} from '../../entities/payment-transaction-pse.interface';

export enum TypeAction {
  LOAD_INIT = '[PAYMENT FD] - Load Init Pse',
  SUCCESS_INIT = '[PAYMENT FD] - Success Init Pse',
  FAIL_INIT = '[PAYMENT FD] - Fail Init Pse',
  RESET_INIT = '[PAYMENT FD] - Reset Init Pse',
}

export const loadInitPseAction = createAction(
  TypeAction.LOAD_INIT,
  props<{ body: IPaymentPseRequest }>(),
);

export const successInitPseAction = createAction(
  TypeAction.SUCCESS_INIT,
  props<{ data: IPaymentPseResponse }>(),
);

export const failInitPseAction = createAction(
  TypeAction.FAIL_INIT,
  props<{ errorMessage: string }>(),
);

export const resetInitPseAction = createAction(TypeAction.RESET_INIT);
