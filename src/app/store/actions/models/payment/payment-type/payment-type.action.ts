import { Action } from '@ngrx/store';

export const PAYMENT_TYPE_SET = '[Account Payment] Type Set';

export class PaymentTypeSetAction implements Action {
  readonly type: string = PAYMENT_TYPE_SET;
  constructor(public paymentType: string) {}
}

export type actions = PaymentTypeSetAction;
