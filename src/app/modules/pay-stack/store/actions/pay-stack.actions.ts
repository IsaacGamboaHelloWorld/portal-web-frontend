import { createAction } from '@ngrx/store';
import {
  PilaPaymentRequest,
  PilaPaymentResponse,
} from '../../entities/pay-stack';

const enum TypeActions {
  LOAD = '[CREATE PAY_STACK / API] Create pay_stack Load',
  FAIL = '[CREATE PAY_STACK / API] Create pay_stack Fail',
  SUCCESS = '[CREATE PAY_STACK / API] Create pay_stack Success',
  RESET = '[CREATE PAY_STACK / API] Create pay_stack Reset',
}

export const PayStackLoad = createAction(
  TypeActions.LOAD,
  (data?: PilaPaymentRequest) => ({
    data,
  }),
);

export const PayStackFail = createAction(
  TypeActions.FAIL,
  (description: string, specificErrorCode: string = '') => ({
    description,
    specificErrorCode,
  }),
);
export const PayStackSuccess = createAction(
  TypeActions.SUCCESS,
  (data: PilaPaymentResponse) => ({ data }),
);

export const PayStackReset = createAction(TypeActions.RESET);
