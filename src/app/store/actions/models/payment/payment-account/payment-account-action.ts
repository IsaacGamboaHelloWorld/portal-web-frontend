import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import { Action } from '@ngrx/store';

export const PAYMENT_LOAD = '[Account Payment] Load Payment';
export const PAYMENT_SUCCESS = '[Account Payment] Payment Success';
export const PAYMENT_FAIL = '[Account Payment] Payment Fail';
export const PAYMENT_RESET = '[Account Payment] Payment reset';

export class PaymentLoadAction implements Action {
  readonly type: string = PAYMENT_LOAD;

  constructor(
    public ownershipIdType: string,
    public ownershipIdNumber: string,
    public originAccountId: number,
    public originAccountType: string,
    public destinationAccountId: string,
    public destinationAccountType: string,
    public destinationLoanName: string,
    public destinationNewLoan: string,
    public bank: string,
    public amount: number | string,
    public notes: string,
  ) {}
}

export class PaymentSuccessAction implements Action {
  readonly type: string = PAYMENT_SUCCESS;
  constructor(public payment: PaymentInterface) {}
}

export class PaymentFailAction implements Action {
  readonly type: string = PAYMENT_FAIL;
  constructor(public error: string, public specificErrorCode: string = '') {}
}

export class PaymentResetAction implements Action {
  readonly type: string = PAYMENT_RESET;
}

export type actions =
  | PaymentLoadAction
  | PaymentSuccessAction
  | PaymentFailAction
  | PaymentResetAction;
