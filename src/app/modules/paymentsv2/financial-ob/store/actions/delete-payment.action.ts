import { createAction } from '@ngrx/store';
import {
  IDeleteLoanRequest,
  IDeleteLoanResponse,
} from '../../entities/financial-op';

const enum TypeActions {
  LOAD = '[DELETE LOAN / API] Delete Payments Load',
  FAIL = '[DELETE LOAN / API] Delete Payments Fail',
  SUCCESS = '[DELETE LOAN / API] Delete Payments Success',
  RESET = '[DELETE LOAN / API] Delete Payments Success',
}

export const DeleteLoanLoad = createAction(
  TypeActions.LOAD,
  (deleteData: IDeleteLoanRequest) => ({ deleteData }),
);

export const DeleteLoanFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const DeleteLoanSuccess = createAction(
  TypeActions.SUCCESS,
  (deleteData: IDeleteLoanResponse) => ({ deleteData }),
);

export const DeleteLoanReset = createAction(TypeActions.RESET);
