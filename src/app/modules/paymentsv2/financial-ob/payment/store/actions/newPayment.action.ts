import { createAction } from '@ngrx/store';
import { IFinancialObRequest } from '../../entities/new-payment';

const enum TypeActions {
  LOAD = '[CREATE PAYMENT / API] Create payment Load FO',
  FAIL = '[CREATE PAYMENT / API] Create payment Fail FO',
  SUCCESS = '[CREATE PAYMENT / API] Create payment Success FO',
  RESET = '[CREATE PAYMENT / API] Create payment Reset FO',
}

export const CreateFOPaymentLoad = createAction(
  TypeActions.LOAD,
  (data: IFinancialObRequest) => ({ data }),
);

export const CreateFOPaymentFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CreateFOPaymentSuccess = createAction(
  TypeActions.SUCCESS,
  (data: any) => ({ data }),
);

export const CreateFOPaymentReset = createAction(TypeActions.RESET);
