import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { ICategoriesTransfer } from '@core/interfaces/categoriesTransfer.interface';
import { CategoriesService } from '@core/services/categories/categories.service';
import * as categories from '@store/actions/models/categories/categories.action';

@Injectable()
export class CategoriesEffect {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
  ) {}

  @Effect()
  LoadCategories: Observable<Action> = this.actions$.pipe(
    ofType<categories.LoadCategoriesAction>(categories.LOAD_CATEGORIES),
    switchMap((_) => {
      return this.categoriesService.categories().pipe(
        map((resp: ICategoriesTransfer) => {
          if (!isNullOrUndefined(resp.success) && resp.success) {
            return new categories.SuccessCategoriesAction(resp.categories);
          } else {
            return new categories.ErrorCategoriesAction();
          }
        }),
        catchError((err) => of(new categories.ErrorCategoriesAction())),
      );
    }),
  );
}
