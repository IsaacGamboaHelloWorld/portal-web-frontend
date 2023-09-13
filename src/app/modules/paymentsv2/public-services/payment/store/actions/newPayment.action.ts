import { createAction } from '@ngrx/store';
import { IServicePublicRequest } from '../../entities/new-payment';

const enum TypeActions {
  LOAD = '[CREATE PAYMENT / API] Create payment Load',
  FAIL = '[CREATE PAYMENT / API] Create payment Fail',
  SUCCESS = '[CREATE PAYMENT / API] Create payment Success',
  RESET = '[CREATE PAYMENT / API] Create payment Reset',
}

export const CreatePaymentLoad = createAction(
  TypeActions.LOAD,
  (data: IServicePublicRequest) => ({ data }),
);

export const CreatePaymentFail = createAction(
  TypeActions.FAIL,
  (description: string, data: any = null, specificErrorCode: string = '') => ({
    description,
    data,
    specificErrorCode,
  }),
);
export const CreatePaymentSuccess = createAction(
  TypeActions.SUCCESS,
  (data: any) => ({ data }),
);

export const CreatePaymentReset = createAction(TypeActions.RESET);
