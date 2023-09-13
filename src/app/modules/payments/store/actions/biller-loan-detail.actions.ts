import { createAction } from '@ngrx/store';
import {
  IAnswerBillerLoanDetail,
  ISendBillerLoanDetail,
} from '../../entities/biller-loan-detail';

const enum TypeActions {
  LOAD = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Load load detail',
  FAIL = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Fail load detail',
  SUCCESS = '[CREATE BILLER_LOAN_DETAIL / API] Create biller load detail Success load detail',
  RESET = '[CREATE BILLER_LOAN_DETAIL / API] Create reference Reset BILLER_LOAN_DETAIL',
}

export const BillerLoanDetailLoad = createAction(
  TypeActions.LOAD,
  (data?: ISendBillerLoanDetail) => ({
    data,
  }),
);

export const BillerLoanDetailFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const BillerLoanDetailSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerBillerLoanDetail) => ({ data }),
);
export const BillerLoanDetailReset = createAction(TypeActions.RESET);
