import { createAction } from '@ngrx/store';
import { IHomePocketAccount } from '../../entities/home-pockets';

const enum TypeActions {
  Load = '[HOME POCKETS / API] Home pockets Load',
  FAIL = '[HOME POCKETS / API] Home pockets Fail',
  SUCCESS = '[HOME POCKETS / API] Home pockets Success',
  RESET = '[HOME POCKETS / API] Home pockets Reset',
}

export const HomePocketsLoad = createAction(TypeActions.Load);

export const HomePocketsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const HomePocketsSuccess = createAction(
  TypeActions.SUCCESS,
  (pockets: IHomePocketAccount[]) => ({ pockets }),
);
export const HomePocketsReset = createAction(TypeActions.RESET);
