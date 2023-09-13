import { createAction } from '@ngrx/store';
import { IFavorite } from '../../entities/favorites';

const enum TYPE_ACTIONS {
  LOAD = '[Favorite] Load',
  FAIL = '[Favorite] Fail',
  SUCCESS = '[Favorite] Success',
  DELETE = '[Favorite] Load Delete',
  SUCCESS_DELETE = '[Favorite] Success Delete',
  FAIL_DELETE = '[Favorite] Fail Delete',
}

export const FavoriteLoad = createAction(TYPE_ACTIONS.LOAD);

export const FavoriteFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const FavoriteSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (favorites: IFavorite[]) => ({ favorites }),
);
export const FavoriteDelete = createAction(
  TYPE_ACTIONS.DELETE,
  (favorite: IFavorite) => ({ favorite }),
);
export const FavoriteSuccessDelete = createAction(TYPE_ACTIONS.SUCCESS_DELETE);
export const FavoriteFailDelete = createAction(TYPE_ACTIONS.FAIL_DELETE);
