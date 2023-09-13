import { Action } from '@ngrx/store';
import { PaymentBillResponseInterface } from '../../../../../core/interfaces/paymentBills.interface';

export const PAYMENT_BILLS_PUBLIC_LOAD =
  '[Account Payment] Products Bills Public Load';
export const PAYMENT_BILLS_PUBLIC_SUCCESS =
  '[Account Payment] Products Bills Public Success';
export const PAYMENT_BILLS_PUBLIC_FAIL =
  '[Account Payment] Products Bills Public Fail';
export const PAYMENT_BILLS_PUBLIC_RESET =
  '[Account Payment] Products Bills Public reset';

export class PaymentBillsPublicLoadAction implements Action {
  readonly type: string = PAYMENT_BILLS_PUBLIC_LOAD;
  constructor(
    public originAccountId: string,
    public originAccountType: string,
    public amount: string,
    public biller: boolean,
    public billerId: string,
    public billerName: string,
    public billerNickName: string,
    public contract: string,
    public invoice: string,
    public dueDate: string,
    public scheduledDate: string,
    public expirationDate: string,
    public isScheduledPayment: boolean,
    public isDonePayment: boolean,
    public primaryBillerAmount: string,
    public primaryBillerCurrencyCode: string,
    public reference: string,
    public secondaryBillerAmount: string,
    public secondaryBillerCurrencyCode: string,
  ) {}
}

export class PaymentBillsPublicSuccessAction implements Action {
  readonly type: string = PAYMENT_BILLS_PUBLIC_SUCCESS;
  constructor(public response: PaymentBillResponseInterface) {}
}

export class PaymentBillsPublicFailAction implements Action {
  readonly type: string = PAYMENT_BILLS_PUBLIC_FAIL;
  constructor(public error: string) {}
}

export class PaymentBillsPublicResetAction implements Action {
  readonly type: string = PAYMENT_BILLS_PUBLIC_RESET;
}

export type actions =
  | PaymentBillsPublicSuccessAction
  | PaymentBillsPublicSuccessAction
  | PaymentBillsPublicFailAction
  | PaymentBillsPublicResetAction;
