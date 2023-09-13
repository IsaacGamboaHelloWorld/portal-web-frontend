import { createAction } from '@ngrx/store';
import {
  IAnswerPaymentTaxes,
  ISendPaymentTaxes,
} from '../../entities/payment-taxes';

const enum TypeActions {
  LOAD = '[CREATE PAYMENT_TAXES / API] Create payment_taxes Load',
  FAIL = '[CREATE PAYMENT_TAXES / API] Create payment_taxes Fail',
  SUCCESS = '[CREATE PAYMENT_TAXES / API] Create payment_taxes Success',
  RESET = '[CREATE PAYMENT_TAXES / API] Create payment_taxes Reset',
}

export const PaymentTaxesLoad = createAction(
  TypeActions.LOAD,
  (data?: ISendPaymentTaxes) => ({
    data,
  }),
);

export const PaymentTaxesFail = createAction(
  TypeActions.FAIL,
  (description: string, specificErrorCode: string = '') => ({
    description,
    specificErrorCode,
  }),
);
export const PaymentTaxesSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerPaymentTaxes) => ({ data }),
);

export const PaymentTaxesReset = createAction(TypeActions.RESET);
