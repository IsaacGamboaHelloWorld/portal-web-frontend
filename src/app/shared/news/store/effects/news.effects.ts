import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { IPrefsLoadResponse } from '../../entities/news';
import { NewsService } from '../../services/news.service';
import * as LoadPrefActions from '../actions/news.actions';
// tslint:disable-next-line: no-duplicate-imports
import * as SavePrefActions from '../actions/news.actions';

@Injectable()
export class NewsEffect {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  SavePref: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SavePrefActions.SavePrefsLoad),
      switchMap((action) => {
        return this.newsService.savePrefs(action.data).pipe(
          take(1),
          map((data) => {
            if (!!data.success && data.success) {
              return SavePrefActions.SavePrefsSuccess(data);
            }
            return SavePrefActions.SavePrefsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(SavePrefActions.SavePrefsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadPref: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadPrefActions.LoadPrefsLoad),
      switchMap((action) => {
        return this.newsService.LoadPrefs().pipe(
          take(1),
          map((data: IPrefsLoadResponse) => {
            if (!!data.success && data.success) {
              return LoadPrefActions.LoadPrefsSuccess(data);
            }
            return LoadPrefActions.LoadPrefsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(LoadPrefActions.LoadPrefsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );
}
