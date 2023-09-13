import { createReducer, on } from '@ngrx/store';

import { IFavorite } from '@modules/transfer-to-account/entities/favorites';
import * as fromFavorite from '@store/actions/models/transfer/favorite/favorite.actions';

export interface IFavorites {
  data: IFavorite[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initFavorite: IFavorites = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const favoriteReducer = createReducer(
  initFavorite,
  on(fromFavorite.FavoriteLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),

  on(fromFavorite.FavoriteSuccess, (state, { favorites }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: favorites,
    };
  }),
  on(fromFavorite.FavoriteFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
