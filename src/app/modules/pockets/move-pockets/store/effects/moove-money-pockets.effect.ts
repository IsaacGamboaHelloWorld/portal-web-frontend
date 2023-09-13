import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { IRespondHomePockets } from '@modules/pockets/home-pockets/entities/home-pockets';
import { HomePocketsService } from '@modules/pockets/home-pockets/services/home-pockets.service';
import * as HomePocketsActions from '../actions/get-pockets.action';

@Injectable()
export class HomePocketsEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: HomePocketsService,
  ) {}

  HomePockets: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePocketsActions.HomePocketsLoad),
      switchMap((action) => {
        return this.pocketsService.homePockets().pipe(
          take(1),
          map((data: IRespondHomePockets) => {
            if (!!data.success && data.success) {
              return HomePocketsActions.HomePocketsSuccess(
                data.currentPocketsByProduct,
              );
            }
            return HomePocketsActions.HomePocketsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(HomePocketsActions.HomePocketsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );
}
