import { createAction } from '@ngrx/store';
import { ICategoriesEPocket } from '../../entities/edit-pocket';

const enum TypeActions {
  LOAD = '[Edit POCKET / API] Edit pocket Load Categories',
  FAIL = '[Edit POCKET / API] Edit pocket Fail Categories',
  SUCCESS = '[Edit POCKET / API] Edit pocket Success categories',
}

export const CategoriesEPocketLoad = createAction(TypeActions.LOAD);

export const CategoriesEPocketFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CategoriesEPocketSuccess = createAction(
  TypeActions.SUCCESS,
  (data: ICategoriesEPocket) => ({ data }),
);
