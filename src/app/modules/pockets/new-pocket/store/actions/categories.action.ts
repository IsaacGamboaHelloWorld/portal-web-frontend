import { createAction } from '@ngrx/store';
import { ICategoriesPocket } from '../../entities/new-pockets';

const enum TypeActions {
  LOAD = '[CREATE POCKET / API] Create pocket Load Categories',
  FAIL = '[CREATE POCKET / API] Create pocket Fail Categories',
  SUCCESS = '[CREATE POCKET / API] Create pocket Success categories',
}

export const CategoriesocketLoad = createAction(TypeActions.LOAD);

export const CategoriesPocketFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CategoriesPocketSuccess = createAction(
  TypeActions.SUCCESS,
  (data: ICategoriesPocket) => ({ data }),
);
