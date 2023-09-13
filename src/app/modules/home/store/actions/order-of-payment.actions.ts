import { createAction } from '@ngrx/store';
import { IOrderPaymentAll } from '../../entities/order-of-payment';

const enum TypeActionsAssign {
  LOAD = '[CREATE ORDER_OF_PAYMENT / API] Create order_of_payment Load',
  FAIL = '[CREATE ORDER_OF_PAYMENT / API] Create order_of_payment Fail',
  SUCCESS = '[CREATE ORDER_OF_PAYMENT / API] Create order_of_payment Success',
  RESET = '[CREATE ORDER_OF_PAYMENT / API] Create order_of_payment Reset',
}

export const OrderOfPaymentLoad = createAction(TypeActionsAssign.LOAD);

export const OrderOfPaymentFail = createAction(
  TypeActionsAssign.FAIL,
  (data: IOrderPaymentAll) => ({ data }),
);
export const OrderOfPaymentSuccess = createAction(
  TypeActionsAssign.SUCCESS,
  (data: IOrderPaymentAll) => ({ data }),
);
export const OrderOfPaymentReset = createAction(TypeActionsAssign.RESET);
