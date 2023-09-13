import { createAction } from '@ngrx/store';
import {
  IDeleteServiceRequest,
  IDeleteServiceResponse,
} from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[DELETE PUBLIC SERVICES / API] Delete Payments Load',
  FAIL = '[DELETE PUBLIC SERVICES / API] Delete Payments Fail',
  SUCCESS = '[DELETE PUBLIC SERVICES / API] Delete Payments Success',
  RESET = '[DELETE PUBLIC SERVICES / API] Delete Payments Success',
}

export const DeletePaymentPublicLoad = createAction(
  TypeActions.LOAD,
  (deleteData: IDeleteServiceRequest) => ({ deleteData }),
);

export const DeletePaymentPublicFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const DeletePaymentPublicSuccess = createAction(
  TypeActions.SUCCESS,
  (deleteData: IDeleteServiceResponse) => ({ deleteData }),
);

export const DeletePaymentPublicReset = createAction(TypeActions.RESET);
