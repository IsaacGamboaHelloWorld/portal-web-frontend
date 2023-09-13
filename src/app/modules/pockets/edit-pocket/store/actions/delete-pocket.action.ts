import { createAction } from '@ngrx/store';
import {
  IDeletePocketRequest,
  IDeletePocketResponse,
} from '../../entities/edit-pocket';

const enum TypeActions {
  Load = '[DELETE POCKETS / API] Delete pockets Load',
  FAIL = '[DELETE POCKETS / API] Delete pockets Fail',
  SUCCESS = '[DELETE POCKETS / API] Delete pockets Success',
  RESET = '[DELETE POCKETS / API] Delete pockets Reset',
}

export const DeletePocketLoad = createAction(
  TypeActions.Load,
  (data: IDeletePocketRequest) => ({ data }),
);

export const DeletePocketFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const DeletePocketSuccess = createAction(
  TypeActions.SUCCESS,
  (response: IDeletePocketResponse) => ({ response }),
);
export const DeletePocketReset = createAction(TypeActions.RESET);
