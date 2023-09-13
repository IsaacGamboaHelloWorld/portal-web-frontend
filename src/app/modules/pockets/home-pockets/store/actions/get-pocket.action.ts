import { createAction } from '@ngrx/store';
import { IHomePocketAccount } from '../../entities/home-pockets';

const enum TypeActions {
  Load = '[DETAIL POCKET / API] Detail Pocket Load',
  FAIL = '[DETAIL POCKET / API] Detail Pocke Fail',
  SUCCESS = '[DETAIL POCKET / API] Detail Pocke Success',
}

export const DetailPocketLoad = createAction(TypeActions.Load);

export const DetailPockesFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const DetailPocketSuccess = createAction(
  TypeActions.SUCCESS,
  (pocket: IHomePocketAccount[]) => ({ pocket }),
);
