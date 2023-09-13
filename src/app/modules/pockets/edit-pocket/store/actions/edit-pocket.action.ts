import { createAction } from '@ngrx/store';
import {
  IEditPocketRequest,
  IEditPocketResponse,
} from '../../entities/edit-pocket';

const enum TypeActions {
  Load = '[EDIT POCKETS / API] Edit pockets Load',
  FAIL = '[EDIT POCKETS / API] Edit pockets Fail',
  SUCCESS = '[EDIT POCKETS / API] Edit pockets Success',
  RESET = '[EDIT POCKETS / API] Edit pockets Reset',
}

export const EditPocketLoad = createAction(
  TypeActions.Load,
  (data: IEditPocketRequest) => ({ data }),
);

export const EditPocketFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const EditPocketSuccess = createAction(
  TypeActions.SUCCESS,
  (response: IEditPocketResponse) => ({ response }),
);
export const EditPocketReset = createAction(TypeActions.RESET);
