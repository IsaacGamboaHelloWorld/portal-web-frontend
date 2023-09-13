import { createAction } from '@ngrx/store';
import {
  IHomePocketsRecord,
  IPocketToSearch,
} from '../../entities/home-pockets';

const enum TypeActions {
  LOAD = '[UPDATE POCKETS / API] Update pockets Load',
  LOAD_DETAIL = '[UPDATE POCKETS / API] Update pockets load detail',
  FAIL = '[UPDATE POCKETS / API] Update pockets Fail',
  SUCCESS = '[UPDATE POCKETS / API] Update pockets Success',
  RESET = '[UPDATE POCKETS / API] Update pockets Reset',
}

export const UpdatePocketsLoad = createAction(
  TypeActions.LOAD,
  (data: IPocketToSearch) => ({ data }),
);

export const UpdateDetailPocketLoad = createAction(
  TypeActions.LOAD_DETAIL,
  (data: IPocketToSearch) => ({ data }),
);

export const UpdatePocketsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const UpdatePocketsSuccess = createAction(
  TypeActions.SUCCESS,
  (pockets: IHomePocketsRecord) => ({ pockets }),
);
export const UpdatePocketsReset = createAction(TypeActions.RESET);
