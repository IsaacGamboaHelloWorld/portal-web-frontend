import { createAction } from '@ngrx/store';
import {
  IBillerDetailRequest,
  IBillerDetailResponse,
} from '../../payment/entities/new-payment';

const enum TypeActions {
  LOAD = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Load load detail',
  FAIL = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Fail load detail',
  SUCCESS = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Success load detail',
  RESET = '[CREATE BILLER_LOAN_DETAIL / API] Create reference Reset BILLER_LOAN_DETAIL',
}

export const BillerDetailLoad = createAction(
  TypeActions.LOAD,
  (data?: IBillerDetailRequest) => ({
    data,
  }),
);

export const BillerDetailFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const BillerDetailSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IBillerDetailResponse) => ({ data }),
);
export const BillerDetailReset = createAction(TypeActions.RESET);
