import { Action } from '@ngrx/store';

import { LoanDestinationInterface } from '@app/core/interfaces/loan-destination.interface';

export const PAYMENT_DESTINATION_PRODUCTS_LOAD =
  '[Account Payment] Products Destination Load';
export const PAYMENT_DESTINATION_PRODUCTS_SUCCESS =
  '[Account Payment] Products Destination Success';
export const PAYMENT_DESTINATION_PAYMENT_SUCCESS =
  '[Account Payment] Products Payment Success';
export const PAYMENT_DESTINATION_PRODUCTS_FAIL =
  '[Account Payment] Products Destination Fail';
export const PAYMENT_DESTINATION_PRODUCTS_RESET =
  '[Account Payment] Products Destination reset';

export class LoansDestinationLoadAction implements Action {
  readonly type: string = PAYMENT_DESTINATION_PRODUCTS_LOAD;

  constructor() {}
}

export class LoansDestinationSuccessAction implements Action {
  readonly type: string = PAYMENT_DESTINATION_PRODUCTS_SUCCESS;
  constructor(public loans: LoanDestinationInterface[]) {}
}

export class LoansDestinationPaymentSuccessAction implements Action {
  readonly type: string = PAYMENT_DESTINATION_PAYMENT_SUCCESS;
}

export class LoansDestinationFailAction implements Action {
  readonly type: string = PAYMENT_DESTINATION_PRODUCTS_FAIL;
}

export class LoansDestinationResetAction implements Action {
  readonly type: string = PAYMENT_DESTINATION_PRODUCTS_RESET;
}

export type actions =
  | LoansDestinationLoadAction
  | LoansDestinationPaymentSuccessAction
  | LoansDestinationSuccessAction
  | LoansDestinationFailAction
  | LoansDestinationResetAction;
