import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  retry,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { IRespFavorite } from '../../entities/favorites';
import { FavoriteService } from '../../services/favorite/favorite.service';
import * as favorite from '../actions/favorite.actions';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private favoriteService: FavoriteService,
  ) {}

  FavoriteLoad: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(favorite.FavoriteLoad),
      switchMap(() => {
        return this.favoriteService.allFavorites().pipe(
          take(1),
          takeUntil(this.globalData.cancel),
          map((data: IRespFavorite) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return favorite.FavoriteSuccess(data.favoriteTransfers);
            }
            return favorite.FavoriteFail(data.errorMessage);
          }),
          catchError((err) => of(favorite.FavoriteFail(err.errorMessage))),
        );
      }),
    ),
  );

  DeleteFavorite: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(favorite.FavoriteDelete),
      switchMap((action) => {
        return this.favoriteService.deleteFavorite(action.favorite).pipe(
          retry(1),
          takeUntil(this.globalData.cancel),
          map((data: { success: boolean }) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return favorite.FavoriteLoad();
            }
            return favorite.FavoriteFailDelete();
          }),
          catchError((err) => of(favorite.FavoriteFailDelete())),
        );
      }),
    ),
  );
}
