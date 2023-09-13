import { createAction } from '@ngrx/store';
import { MovementsFileResponse } from '../../entities/movements-file';

const enum TYPE_ACTIONS {
  LOAD = '[Movements File] Load',
  FAIL = '[Movements File] Fail',
  SUCCESS = '[Movements File] Success',
  RESET = '[Movements File] Reset',
}

export const MovementsFileLoad = createAction(
  TYPE_ACTIONS.LOAD,
  (request: any) => ({ request }),
);
export const MovementsFileFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const MovementsFileSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (data: MovementsFileResponse) => ({ data }),
);
export const MovementsFileReset = createAction(TYPE_ACTIONS.RESET);
