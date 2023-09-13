import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { IUserPockets } from '@app/core/interfaces/pockets/userPockets';
import * as pocketsActions from '@store/actions/models/pockets/user-pockets.action';
import { PocketsService } from '../services/pockets/pockets.service';

@Injectable()
export class PocketsEffect {
  constructor(
    private actions$: Actions,
    private destinationService: PocketsService,
  ) {}

  @Effect()
  LoadPockets: Observable<Action> = this.actions$.pipe(
    ofType<pocketsActions.PocketsLoadAction>(pocketsActions.POCKETS_LOAD),
    switchMap((action: pocketsActions.PocketsLoadAction) => {
      return this.destinationService.pockets().pipe(
        map((items: IUserPockets) => {
          if (!isNullOrUndefined(items.success) && items.success) {
            return new pocketsActions.PocketsSuccessAction(
              items.currentPocketsByProduct,
            );
          } else {
            return new pocketsActions.PocketsFailAction();
          }
        }),
        catchError((_) => of(new pocketsActions.PocketsFailAction())),
      );
    }),
  );
}
