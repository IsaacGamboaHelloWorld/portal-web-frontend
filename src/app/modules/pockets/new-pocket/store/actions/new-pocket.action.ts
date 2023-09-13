import { createAction } from '@ngrx/store';
import { IAnswerPocket, ISendPocket } from '../../entities/new-pockets';

const enum TypeActions {
  LOAD = '[CREATE POCKET / API] Create pocket Load',
  FAIL = '[CREATE POCKET / API] Create pocket Fail',
  SUCCESS = '[CREATE POCKET / API] Create pocket Success',
  RESET = '[CREATE POCKET / API] Create pocket Reset',
}

export const CreatePocketLoad = createAction(
  TypeActions.LOAD,
  (data: ISendPocket) => ({ data }),
);

export const CreatePocketFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CreatePocketSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerPocket) => ({ data }),
);

export const CreatePocketReset = createAction(TypeActions.RESET);
